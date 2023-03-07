import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { HeaderService } from 'src/app/services/header.service';
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-patient_assigned-list-view',
  templateUrl: './patient_assigned-list-view.component.html',
  styleUrls: ['./patient_assigned-list-view.component.scss']
})
export class PatientAssignedListViewComponent implements OnInit {

  $headerAction!: Subscription;

  patients_assigned : Patient[] = [];

  constructor(
    private router : Router,
    private headerService : HeaderService,
    private backendService : BackendService,
    private utilService: UtilService
    ) {}

  ngAfterViewInit(): void {
    // this.$headerAction! = this.headerService.getOutAction().subscribe(data => {
    //   switch (data.action) {
    //     case 'delete':
    //       this.delete();
    //       break;
      
    //     default:
    //       break;
    //   }
    // });
    this.headerService.setSetupSearch({name:'patient'});
  }

  ngOnInit(): void {
    this.getAll();
    // this.headerService.setHeader({name:'hobbies_interest',type:'list'});
    // this.utilService.set({name:'hobbies_interest', type:'list'});
    this.headerService.setSetupSearch({name:'patient'});
  }

  getAll(){
   this.backendService.getAll(PSYCHOTHERAPY.PATIENT, {}).subscribe({
     next: (v) => { this.patients_assigned = v; console.log(this.patients_assigned);
      },
     error: (e) => console.error(e),
     complete: () => console.info('complete')
   });
  }

}