import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 

//SERVICES
import { PatientService } from 'src/app/services/patient.service';
import { UtilService } from 'src/app/services/util.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-personal_characteristics-form-view',
  templateUrl: './personal_characteristics-form-view.component.html',
  styleUrls: ['./personal_characteristics-form-view.component.scss']
})
export class PersonalCharacteristicsFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: UntypedFormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;
  zip_codes: any;
  neighborhoods = [];

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private fb: UntypedFormBuilder,
    // private stepperFisherProducerForm: StepperFisherProducerFormService
  ) {
    // this.setFocus();
    this.formGroup = this.fb.group({
      notes: new UntypedFormControl(null, [Validators.required])
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
  }

  get paForm() { return this.formGroup.controls }
  
  ngOnDestroy() {
  }

  onFormValid() {
    this.utilService.setPersonalCharacteristicsClinicalNote(this.formGroup.value);
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
