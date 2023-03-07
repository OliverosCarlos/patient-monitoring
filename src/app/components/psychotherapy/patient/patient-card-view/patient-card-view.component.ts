import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';
import { Subscription } from 'rxjs';

import { HeaderService } from 'src/app/services/header.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-patient-card-view',
  templateUrl: './patient-card-view.component.html',
  styleUrls: ['./patient-card-view.component.scss']
})
export class PatientCardViewComponent implements OnInit, OnDestroy, AfterViewInit {

  patient_list = [{ id: '', first_name: '', last_name1: '', last_name2: '', age: '', email: '', phone_number: '', image: 'female-placeholder.jpg' }];

  $headerAction!: Subscription;
  $advanceSearch!: Subscription;

  constructor(
    private backendService : BackendService,
    private router: Router,
    private headerService : HeaderService,
  ) { }

  ngOnInit(): void {
    this.getAll({});
  }

  ngAfterViewInit(): void {
    this.$headerAction! = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'delete':
          // this.deletePatients();
          console.log('Deleting');
          
          break;
        case 'view':
          this.router.navigate(['main','psychotherapy', 'patients', data.type]);
          break;
        default:
          break;
      }
    });
    this.$advanceSearch! = this.headerService.getDataSearch().subscribe(data => {
      this.getAll(data)
    });
  }

  ngOnDestroy() {
    this.$headerAction.unsubscribe();
    this.$advanceSearch.unsubscribe();
  }

  getAll(data_search:any) {
    this.backendService.getAll(PSYCHOTHERAPY.PATIENT, data_search).subscribe({
      next: (v) => { this.patient_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  viewPatient(id:string) {
    this.router.navigate(['main','psychotherapy','patients','form',id]);
  }

  // deletePatients(){
  //   this.backendService.delete(PSYCHOTHERAPY.PATIENT, this.selection.selected.map(function(patient){return patient.id})).subscribe({
  //     next: (v) => { console.log(v) },
  //     error: (e) => console.error(e),
  //     complete: () => this.getAll({})
  //   });
  // }
}

export interface Patient {
  id: number,
  first_name: string;
  last_name1: string;
  last_name2: string;
  age: number;
  email: string;
  phone_number: string;
}