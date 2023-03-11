import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { CATALOGS } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-reason_consultation-form-view',
  templateUrl: './reason_consultation-form-view.component.html',
  styleUrls: ['./reason_consultation-form-view.component.scss']
})
export class ReasonConsultationFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: UntypedFormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;

  symptom_list = [];
  selected_symptom = [];
  // suscribeAddressService: Subscription;

  // @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //   if (event.keyCode === 27) {
  //     event.stopImmediatePropagation();
  //     this.onClose();
  //   }
  // }

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private fb: UntypedFormBuilder,
    // private stepperFisherProducerForm: StepperFisherProducerFormService
  ) {
    this.formGroup = this.fb.group({
      symptoms: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      notes: new UntypedFormControl(null, [])
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
    this.getAllSymptom();
  }

  get paForm() { return this.formGroup.controls }
  
  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormValid() {
    console.log(this.formGroup.value);
    this.utilService.setreasonConsultationClinicalNote(this.formGroup.value);

  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
      }
    }
  }

  getAllSymptom(){
    this.backendService.getAll(CATALOGS.SYMPTOMS,{}).subscribe({
      next: (v) => { this.symptom_list = v },
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



}
