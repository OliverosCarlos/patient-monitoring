import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//SERVICES
import { EmotionsService } from 'src/app/services/catalogs/emotions.service';
import { Functionality_analysisService } from 'src/app/services/clinical_note/functionality_analysis.service';
import { GenericModalService } from 'src/app/utils/services/generic_modal.service';
import { EventService } from 'src/app/utils/services/event.service';
import { TaskService } from 'src/app/services/psychotherapy/task.service';

import { GenericModal } from 'src/app/models/generic_modal.model';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;

  emotions_list = [];

  $genericModal!: Subscription;
  $eventService!: Subscription;

  modalConfig: GenericModal = {title:''}
  formValue = {}
  
  constructor(
    private route: ActivatedRoute,
    private emotionsService: EmotionsService,
    private functionality_analysisService: Functionality_analysisService,
    private fb: FormBuilder,
    private genericModalService: GenericModalService,
    private modal: NgbActiveModal,
    private eventsService: EventService,
    private taskService: TaskService
  ) {
  }
  
  ngAfterViewInit(): void {
    this.$eventService = this.eventsService.getInAction().subscribe(event => {
      switch (event.type) {
        case 'form':
          if (event.action == 'completed'){
            this.modalConfig.btn_save = true;
            this.modalConfig.btn_cancel = true;
            this.formValue = event.body!;
          }
          break;
      
        default:
          break;
      }
    });
  }

  ngOnInit() {
    this.modalConfig = this.genericModalService.getModalDefinition();
    this.modalConfig.btn_cancel = true;
    this.getAllEmotions();
  }
  
  ngOnDestroy():void{
    this.$eventService!.unsubscribe();
  }

  private setFocus() {
    setTimeout(() => this.firstInput.nativeElement !== undefined ? this.firstInput.nativeElement.focus() : '');
  }

  getAllEmotions(){
    this.emotionsService.getEmotionsList().subscribe({
      next: (v) => { this.emotions_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  onClose(){
    this.modal.close();
  }

  save(){
    this.modalConfig.save!(this.modalConfig.service, this.formValue);
  }


}