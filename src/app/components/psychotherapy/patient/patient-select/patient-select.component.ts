import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GENERAL } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

@Component({
  selector: 'patient-select',
  templateUrl: './patient-select.component.html',
  styleUrls: ['./patient-select.component.scss']
})
export class PatientSelectComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() eventSetData = new EventEmitter<any>();

  model : Model;

  current_patient = {
    id: '', first_name: '', last_name1: '', last_name2: '', age: '', email: '', phone_number: '', image: 'female-placeholder.jpg', type: ""
 }

  patientList: any[]= [];
  type_color: string[] = []

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
  }

  ngOnInit() {
    this.getAllPatients();
  }
  
  ngOnDestroy() {

  }

  getAllPatients(){
    this.backendService.getAll(GENERAL.PATIENT,{}).subscribe({
      next: (v) => { this.patientList = this.buildPatientList(v); 
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  
  setPatient($ev:any){
    console.log($ev);
    
    let aux_type = ""
    if ($ev.psychoterapy_patient != null) {
      this.type_color = ['#9B7EBD', 'white']
      aux_type = 'Psicoterapia'
    }
    if ($ev.early_stimulation_patient != null) {
      this.type_color = ['#F8ED8C', 'black']
      aux_type = 'Estimulación Temprana'
    }
    if ($ev.neuro_psychology_patient != null) {
      this.type_color = ['#3674B5', 'white']
      aux_type = 'Neuropsicología'
    }
    
    this.current_patient = {...$ev, type: aux_type}
    this.eventSetData.emit(this.current_patient)
  }

  buildPatientList(patientList: any[]){
    return patientList.map( (obj:any) => ({
      ...obj, 
      type:
        obj.psychoterapy_patient != null ?
          'Psicoterapia'
        : obj.early_stimulation_patient != null ?
          'Estimulación Temprana'
        : obj.neuro_psychology_patient != null ?
          'Neuropsicología'
        : null
      })
    )
  }

}
