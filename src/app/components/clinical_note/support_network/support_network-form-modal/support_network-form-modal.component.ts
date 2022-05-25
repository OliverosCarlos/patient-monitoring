import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 

import { EmotionsService } from 'src/app/services/catalogs/emotions.service';
import { Functionality_analysisService } from 'src/app/services/clinical_note/functionality_analysis.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

//SERVICES
import { UtilService } from 'src/app/services/util.service';

import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-support_network-form-modal',
  templateUrl: './support_network-form-modal.component.html',
  styleUrls: ['./support_network-form-modal.component.scss']
})
export class SupportNetworkFormModalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;

  emotions_list = [];
  // suscribeAddressService: Subscription;

  // @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //   if (event.keyCode === 27) {
  //     event.stopImmediatePropagation();
  //     this.onClose();
  //   }
  // }
  levels: string[] = ['Bueno', 'Malo', 'Regular'];

  constructor(
    private route: ActivatedRoute,
    private emotionsService: EmotionsService,
    private functionality_analysisService: Functionality_analysisService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private utilService: UtilService
  ) {
    this.setFocus();
    this.formGroup = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required])
    });

  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.valid))
      .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.invalid))
      .subscribe(() => this.onFormInvalid());


    // if(this.route.snapshot.paramMap.get('patient_id')){
    //   this.isUpdating = true;
    //   this.getPatientById(this.route.snapshot.paramMap.get('patient_id'));
    // }
    this.getAllEmotions();
  }

  get paForm() { return this.formGroup.controls }
  
  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormValid() {
    // const sendDataParent = {
    //   formGroup: this.formGroup.value,
    //   zip_codes: this.zip_codes
    // };
    // this.stepperFisherProducerForm.setAddress(sendDataParent, true);
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  private setFocus() {
    setTimeout(() => this.firstInput.nativeElement !== undefined ? this.firstInput.nativeElement.focus() : '');
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
      }
    }
  }

  getAllEmotions(){
    this.emotionsService.getEmotionsList().subscribe({
      next: (v) => { this.emotions_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
  // cleanFormGroup() {
  //   this.formGroup.get('neighborhood').reset();
  //   this.formGroup.get('locality').reset();
  //   this.formGroup.get('municipality').reset();
  //   this.formGroup.get('state').reset();
  //   this.neighborhoods = [];
  // }

  // digitOnly(ev: any) {
  //   // wont allow e + -  .
  //   return (
  //     ev.keyCode !== 69 &&
  //     ev.keyCode !== 187 &&
  //     ev.keyCode !== 189 &&
  //     ev.keyCode !== 190
  //   );
  // }

  onClose(){}

  save(){
    this.utilService.setNetworkArea({
      data: this.formGroup.value,
      area: this.modalConfigParent.area
    })
  }

}
