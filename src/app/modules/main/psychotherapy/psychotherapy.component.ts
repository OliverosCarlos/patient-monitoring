import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';
import { HeaderService } from 'src/app/services/header.service';

//MODELS
import { Patient, Track } from 'src/app/models/psychotherapy.model'

@Component({
  selector: 'app-psychotherapy',
  templateUrl: './psychotherapy.component.html',
  styleUrls: ['./psychotherapy.component.scss']
})
export class PsychotherapyComponent implements OnInit, AfterViewInit, OnDestroy {

  mainPatientList : Patient[] = []
  patientList : Patient[] = []

  trackList = new MatTableDataSource<Track>([]);
  displayedColumns = ['session_objective', 'session_approach', 'created_at'];

  $advanceSearch!: Subscription;
  searchAttributes : any[] = ["first_name", "last_name1", "last_name2", "email"]

  constructor(
    private backendService : BackendService,
    private router : Router,
    private utilService : UtilService,
    private headerService : HeaderService,
  ) { 
    this.utilService.set({name:'psychotherapy', type:'dashboard'});
    this.getAll({})
  }

  ngOnInit(): void {
    
    this.$advanceSearch! = this.headerService.getDataSearch().subscribe(data => {
      // this.getAllEmotions(data)
      console.log("Searching...");
      

    });
  }

  ngAfterViewInit(): void {
    this.headerService.setSetupSearch({name:'patient'});
  }

  ngOnDestroy():void{
    this.$advanceSearch.unsubscribe();
  }



  getAll(data_search:any){
    this.backendService.getAll(PSYCHOTHERAPY.PATIENT,data_search).subscribe({
      next: (v) => { 
        this.mainPatientList = v;
        this.patientList = v;
       },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  getTrackingByPatient(patient_id:any){
    this.backendService.getOneById(PSYCHOTHERAPY.TRACKING_BY_PATIENT, patient_id).subscribe({
      next: (v) => { this.trackList.data = v;
       },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  show(track:any){
    this.router.navigate(['main','psychotherapy','tracking','form',track.id]);
  }

  createTrack(){
    this.router.navigate(['main','psychotherapy','tracking','form']);
  }

  setSearchAttributes(filters: any){
    this.patientList = this.mainPatientList.filter(
      (item: any) => {
        return Object.keys(filters).every(
          (key : string) => {
            return item[key.split("__")[0]].includes(filters[key]);
          }
        ); 
      }
    );
  }


}
