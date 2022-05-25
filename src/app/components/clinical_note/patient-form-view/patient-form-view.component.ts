import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 

//SERVICES
import { PatientService } from 'src/app/services/patient.service';
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
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';

  patientList = [];
  // }

  current_patient = {
     id: '', first_name: '', last_name1: '', last_name2: '', age: '', email: '', phone_number: '', image: 'female-placeholder.jpg'
  }

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilService: UtilService
  ) {
    this.formGroup = this.fb.group({
      patient: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
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
    this.patientService.getPatientsList().subscribe({
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
