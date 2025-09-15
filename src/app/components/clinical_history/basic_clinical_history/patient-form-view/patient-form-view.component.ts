import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-patient-form-view',
  templateUrl: './patient-form-view.component.html',
  styleUrls: ['./patient-form-view.component.scss']
})
export class PatientFormViewComponent implements OnInit, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: UntypedFormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';

  patientList = [];
  // }

  current_patient = {
     id: '', first_name: '', last_name1: '', last_name2: '', age: '', email: '', phone_number: '', image: 'female-placeholder.jpg'
  }

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private utilService: UtilService
  ) {
    this.formGroup = this.fb.group({
      patient: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
    });
  }
  
  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.getAllPatients();
    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.valid))
      .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.invalid))
      .subscribe(() => this.onFormInvalid());
  }

  getAllPatients(){
    this.backendService.getAll(PSYCHOTHERAPY.PATIENT,{}).subscribe({
      next: (v) => { this.patientList = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
      }
    }
  }

  setPatient($ev:any){
    this.current_patient = $ev
  }

  onFormValid(){
    this.utilService.setPatientClinicalNote(this.formGroup.value);
  }

  onFormInvalid(){

  }
}
