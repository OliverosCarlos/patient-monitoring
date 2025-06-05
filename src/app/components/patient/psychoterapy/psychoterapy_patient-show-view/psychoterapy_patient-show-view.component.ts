import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PATIENT, CLINICAL_HISTORY } from 'src/app/utils/setup/routes.enum'; 
import { FileSaverService } from 'ngx-filesaver';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS 
import { Medical_history } from 'src/app/models/early_stimulation.model'
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-psychoterapy_patient-show-view',
  templateUrl: './psychoterapy_patient-show-view.component.html',
  styleUrls: ['./psychoterapy_patient-show-view.component.scss']
})
export class PsychoterapyPatientShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

  model : Model;

  $headerAction!: Subscription;

  _id = ""
  medical_history_report_id = ""
  clinical_history_data : any;
  report_created = false;

  data: any = {};


  // this.patientForm = this.fb.group({
  //   phone: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //   email: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //   education: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //   occupation: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //   patient: this._formBuilder.group({
  //     first_name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //     last_name1: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //     last_name2: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //     address: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //     age: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //     date_of_birth: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //     gender: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //     birthplace: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //     residence_location: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
  //   }),
  //   // legal_guardian: new FormControl(null, [Validators.maxLength(250)]),
  // });

  constructor(
    private headerService: HeaderService,
    private backendService : BackendService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private router : Router,
    private fileSaverService: FileSaverService
  ) {
    this.model = MODELS.find(model => model.name == 'patient')!;
    this.data = {}
    this._id = this.route.snapshot.paramMap.get('patient_id')!

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

  ngOnInit() {
    this.headerService.setHeader({model: this.model, type:'show'});
    this.utilService.set({name:'patient', type:'show'});
    if(this.route.snapshot.paramMap.get('patient_id')){
      this.getPatientById(this.route.snapshot.paramMap.get('patient_id'));
    }
  }

  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
  }

  getPatientById(id:any){
    if(id){
      this.backendService.getOneById(PATIENT.PSYCHOTHERAPY,id).subscribe({
        next: (v) => { this.data = v; console.log(v);
          this.getClinicalHistoryByPatient(v.id);
         },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  getClinicalHistoryByPatient(patient_id: any){
    if(patient_id){
      this.backendService.getOneById(CLINICAL_HISTORY.EARLY_STIMULATION_BY_PATIENT,patient_id).subscribe({
        next: (v) => { this.clinical_history_data = v; console.log(v);},
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }
  
  edit(){
    this.router.navigate(['main','catalogs','emotions','update',this.route.snapshot.paramMap.get('emotion_id')]);
  }

}