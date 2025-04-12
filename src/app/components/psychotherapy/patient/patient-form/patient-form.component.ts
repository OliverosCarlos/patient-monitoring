import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

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
    private fb: UntypedFormBuilder,
    private _formBuilder: UntypedFormBuilder,
    private headerService : HeaderService,
    private utilService : UtilService
    ) {
      this.model = MODELS.find(model => model.name == 'patient')!;
      this.patientForm = this.fb.group({
        patient_files: this._formBuilder.group({
          photo: new UntypedFormControl(null, [Validators.required])
        }),
        patient_data: this._formBuilder.group({
          first_name: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
          last_name1: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
          last_name2: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
          age: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
          email: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
          phone_number: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
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

  get pForm() { return this.patientForm.get('patient_data') as UntypedFormGroup }
  get PForm(){ return this.patientForm.controls; }
  get pFormFile() { return this.patientForm.get('patient_files') as UntypedFormGroup }


  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'form', type: 'not-ready'});
  }

  getPatientById(id:any){
    if(id){
      this.backendService.getOneById(PSYCHOTHERAPY.PATIENT ,id).subscribe({
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
    this.formData.append('patient_data', JSON.stringify(this.patientForm.value.patient_data));
    this.backendService.createWithFile(PSYCHOTHERAPY.PATIENT_CREATE ,this.formData).subscribe({
      next: (v) => { this.router.navigate(['main','psychotherapy','patients','table']); },
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
    this.router.navigate(['main','psychotherapy','patients','table']);
  }

  onFileSelected(event: any ) {

    const file:File = event.target.files[0];
    this.formData.append('patient_files', file);

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target!.result;
        };
        reader.readAsDataURL(file);
      } 
 }

 handleMouseEnter(){
  this.profile_image_upload = "profile-user-2.png"
 }

 handleMouseLeave(){
  this.profile_image_upload = "profile-user-1.png"
 }

 removeProfileImage(){
  this.profile_image_upload = "profile-user-1.png"
  this.previewImage = null
  this.pFormFile.get("photo")!.setValue(null);
  
 }

}
