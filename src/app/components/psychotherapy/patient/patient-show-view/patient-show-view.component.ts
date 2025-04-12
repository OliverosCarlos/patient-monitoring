import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

@Component({
  selector: 'app-patient-show-view',
  templateUrl: './patient-show-view.component.html',
  styleUrls: ['./patient-show-view.component.scss']
})
export class PatientShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

  model : Model;

  patient = { 
    id: '', 
    first_name: '',
    last_name1: '',
    last_name2: '',
    age: '',
    email: '',
    phone_number: '',
    image: './assets/media/female-placeholder.jpg'
  };


  $headerAction!: Subscription;

  constructor(
    private backendService: BackendService,
    private router : Router,
    private route: ActivatedRoute,
    private headerService : HeaderService,
    private utilService: UtilService
  ) {
    this.model = MODELS.find(model => model.name == 'patient')!;
  }

  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      if(data.action == 'option'){
        switch (data.type) {
          case 'tracking':
            this.tracking();
            break;
          case 'clinical_note':
            this.clinical_note();
            break;
          default:
            break;
        }
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
    this.$headerAction.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getPatientById(id:any){
    if(id){
      this.backendService.getOneById(PSYCHOTHERAPY.PATIENT_BY_ID ,id).subscribe({
        next: (v) => { this.patient = v },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  tracking(){
    if(this.route.snapshot.paramMap.get('patient_id')){
      this.router.navigate(['../','main','psychotherapy','tracking','table','by_patient',this.route.snapshot.paramMap.get('patient_id')]);
      this.getPatientById(this.route.snapshot.paramMap.get('patient_id'));
    }
  }

  clinical_note(){
    if(this.route.snapshot.paramMap.get('patient_id')){
      this.router.navigate(['../','main','psychotherapy','clinical-notes','form',this.route.snapshot.paramMap.get('patient_id')]);
      this.getPatientById(this.route.snapshot.paramMap.get('patient_id'));
    }
  }

}
