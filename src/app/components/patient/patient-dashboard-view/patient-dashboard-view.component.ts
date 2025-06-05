import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { CATALOGS} from 'src/app/utils/setup/routes.enum';

//services
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//models
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

@Component({
  selector: 'app-patient-dashboard-view',
  templateUrl: './patient-dashboard-view.component.html',
  styleUrls: ['./patient-dashboard-view.component.scss']
})
export class PatientDashboardViewComponent implements OnInit, AfterViewInit, OnDestroy {

  patient_psychoterapy_count = 0;
  patient_early_stimulation_count = 0;
  patient_neuro_psychology = 0;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }  

  ngAfterViewInit(): void {

  }


  ngOnDestroy():void{

  }

  getAllPatients(data: any){
    console.log("ALL", data);
    this.patient_psychoterapy_count = data.filter((patient: any) => patient.type.id == "psychoterapy").length;
    this.patient_early_stimulation_count = data.filter((patient: any) => patient.type.id == "early-stimulation").length;
    this.patient_neuro_psychology = data.filter((patient: any) => patient.type.id == "neuro-psychology").length;
  }

  deletePsychologists(){

  }

}