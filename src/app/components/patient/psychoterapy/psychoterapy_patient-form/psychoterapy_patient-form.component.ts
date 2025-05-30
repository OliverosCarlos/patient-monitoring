import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PATIENT } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-psychoterapy_patient-form',
  templateUrl: './psychoterapy_patient-form.component.html',
  styleUrls: ['./psychoterapy_patient-form.component.scss']
})
export class PsychoterapyPatientFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  @Input() nameForm: String = '';

  model : Model;
  
  patientForm!: UntypedFormGroup;
  formData: FormData = new FormData();
  patient_id = 0;

  isUpdating = false;

  $headerAction!: Subscription;

  fileName = ""
  previewImage : any = null
  profile_image_upload = "profile-user-1.png"
  
  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private router : Router,
    private fb: FormBuilder,
    private _formBuilder: FormBuilder,
    private headerService : HeaderService,
    private utilService : UtilService
    ) {
      this.model = MODELS.find(model => model.name == 'patient')!;
      this.patientForm = this.fb.group({
        phone: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        email: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        education: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        occupation: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        patient: this._formBuilder.group({
          first_name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          last_name1: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          last_name2: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          address: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          age: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          date_of_birth: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          gender: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          birthplace: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
          residence_location: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        }),
        // legal_guardian: new FormControl(null, [Validators.maxLength(250)]),
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
    this.headerService.setHeader({model: this.model, type:'form'});
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

  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
  }

  get pForm() { return this.patientForm.get('patient_data') as UntypedFormGroup }
  get PForm(){ return this.patientForm.controls; }


  onFormValid() {
    console.log(this.patientForm.value);
    
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'form', type: 'not-ready'});
  }

  getPatientById(id:any){
    if(id){
      this.backendService.getOneById(PATIENT.PSYCHOTHERAPY ,id).subscribe({
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
    this.backendService.create(PATIENT.PSYCHOTHERAPY, this.patientForm.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => {
        console.log("COMPLETED");
        
        // this.router.navigate(['../','main','catalogs','emotions', 'list']);
        // this.showSuccess();
      }
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
    this.router.navigate(['main','psychotherapy','patients','table']);
  }

}
