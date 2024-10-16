import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CATALOGS } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//models
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

@Component({
  selector: 'app-emotion-show-view',
  templateUrl: './emotion-show-view.component.html',
  styleUrls: ['./emotion-show-view.component.scss']
})
export class EmotionShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

  model : Model;

  emotion = { 
    id: '', 
    code: '',
    name: '',
    description: '',
    color: ''
  };

  $headerAction!: Subscription;

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private router : Router,
    private headerService : HeaderService,
    private utilService: UtilService
  ) {
    this.model = MODELS.find(model => model.name == 'emotion')!;
  }

  ngOnInit() {
    this.headerService.setHeader({model: this.model, type:'show'});
    this.utilService.set({name:'emotion', type:'show'});
    if(this.route.snapshot.paramMap.get('emotion_id')){
      this.getEmotionById(this.route.snapshot.paramMap.get('emotion_id'));
    }
  }
  
  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'edit':
          this.edit();
          break;
      
        default:
          break;
      }
    });
  }

  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getEmotionById(id:any){
    if(id){
      this.backendService.getOneById(CATALOGS.EMOTIONS,id).subscribe({
        next: (v) => { this.emotion = v },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  edit(){
    this.router.navigate(['main','catalogs','emotions','update',this.route.snapshot.paramMap.get('emotion_id')]);
  }

}
