import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

//SERVICES
import { PatientService } from 'src/app/services/patient.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit, AfterViewInit {
  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  @Input() nameForm: String = '';

  
  patientForm!: FormGroup;
  formData: FormData = new FormData();
  patient_id = 0;

  isUpdating = false;

  $headerAction!: Subscription;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router : Router,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private headerService : HeaderService,
    private utilService : UtilService
    ) {
      this.patientForm = this.fb.group({
        patient_files: this._formBuilder.group({
          photo: new FormControl(null, [Validators.required])
        }),
        patient_data: this._formBuilder.group({
          first_name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          last_name1: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          last_name2: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          age: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          email: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          phone_number: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        })
      });
  }

  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'save':
          this.save();
          break;

        case 'cancel':
          this.cancel();
          break;

        default:
          break;
      }
    });
  }

  ngOnInit(): void {
    this.headerService.setHeader({name:'patient', type:'form'});
    this.utilService.set({name:'patient', type:'form'});
    if(this.route.snapshot.paramMap.get('patient_id')){
      this.isUpdating = true;
      this.getPatientById(this.route.snapshot.paramMap.get('patient_id'));
    }

    this.patientForm.statusChanges
    .pipe(
      filter(() => this.patientForm.valid))
    .subscribe(() => this.onFormValid());

  this.patientForm.statusChanges
    .pipe(
      filter(() => this.patientForm.invalid))
    .subscribe(() => this.onFormInvalid());
  }

  get pForm() { return this.patientForm.get('patient_data') as FormGroup }
  get PForm(){ return this.patientForm.controls; }

  // formValid() {

  //   if(this.isUpdating){
  //     let data = {
  //       id:this.route.snapshot.paramMap.get('patient_id'),
  //       first_name : this.patientForm.value.first_name,
  //       last_name : this.patientForm.value.last_name,
  //       age : this.patientForm.value.age
  //     }

  //     this.patientService.updatePatient(data).subscribe({
  //       next: (v) => { console.log(v); },
  //       error: (e) => console.error(e),
  //       complete: () => console.info('complete')
  //     });
  //   }else{
  //     this.patientService.addPatient(this.patientForm.value).subscribe({
  //       next: (v) => { console.log(v); },
  //       error: (e) => console.error(e),
  //       complete: () => console.info('complete')
  //     });
  //   }

  //   // this.modalConfig.create ? this.save() : this.update();
  // }

  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'form', type: 'not-ready'});
  }

  getPatientById(id:any){
    if(id){
      this.patientService.getPatientById(id).subscribe({
        next: (v) => { this.setPatient(v[0]) },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  setPatient(patient:any){
    this.patientForm.patchValue({
      first_name: patient.first_name,
      last_name: patient.last_name,
      age: patient.age
    })
  }

  save(){
    this.formData.append('patient_files', this.patientForm.value.patient_files.photo[0].file);
    this.formData.append('patient_data', JSON.stringify(this.patientForm.value.patient_data));
    this.patientService.addPatient(this.formData).subscribe({
      next: (v) => { this.router.navigate(['psychotherapy','patients','table']); },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.pForm.get(formName)!.value;
      if (value) {
        this.pForm.get(formName)!.setValue(value.toUpperCase());
      }
    }
  }

  cancel(){
    this.router.navigate(['psychotherapy','patients','table']);
  }
}
