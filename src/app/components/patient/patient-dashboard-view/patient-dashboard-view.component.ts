import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(
    ) { 
    }

  ngOnInit(): void {
  }  

  ngAfterViewInit(): void {

  }


  ngOnDestroy():void{

  }

  getAllEmotions(data_search:any){

  }

  deletePsychologists(){

  }

}