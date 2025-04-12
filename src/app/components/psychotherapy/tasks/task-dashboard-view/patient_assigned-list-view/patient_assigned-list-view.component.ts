import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';
import { NgxSpinnerService } from 'ngx-spinner';

//SERVICES
import { HeaderService } from 'src/app/services/header.service';
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS
import { Patient } from 'src/app/models/psychotherapy.model';

@Component({
  selector: 'app-patient_assigned-list-view',
  templateUrl: './patient_assigned-list-view.component.html',
  styleUrls: ['./patient_assigned-list-view.component.scss']
})
export class PatientAssignedListViewComponent implements OnInit {

  $utilService!: Subscription;

  patients_assigned : any[] = [];
  searchAttributes : any[] = ['first_name', 'email', 'tarea']

  constructor(
    private router : Router,
    private spinner: NgxSpinnerService,
    private headerService : HeaderService,
    private backendService : BackendService,
    private utilService: UtilService
    ) {}

  ngAfterViewInit(): void {
    this.$utilService! = this.utilService.getPatientTaskAssigned().subscribe(data => {
      if(data.status == 200){
        this.getAll();
      }
    });
    // this.headerService.setSetupSearch({name:'patient'});
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.spinner.show('loading-patients-assigned')
    this.backendService.getAll(PSYCHOTHERAPY.PATIENTS_TASKS_ASSIGNED, {}).subscribe({
      next: (v) => {
        console.log(v);
        
        this.patients_assigned = v.filter((patient: { tasks: any[]; }) => patient.tasks.length > 0);
      },
      error: (e) => console.error(e),
      complete: () => this.spinner.hide('loading-patients-assigned')
    });
  }

  reviewTask(patient: any){
    this.router.navigate(['main','psychotherapy','task','application','show',patient.tasks[0].id]);
  }

  setSearchAttributes(attributes: any){
    console.log(attributes);
    
  }

}