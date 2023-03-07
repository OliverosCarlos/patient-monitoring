import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';
import { Subscription } from 'rxjs';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

//SERVICES
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-patient-list-view',
  templateUrl: './patient-list-view.component.html',
  styleUrls: ['./patient-list-view.component.scss']
})
export class PatientListViewComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['select', 'first_name', 'last_name1', 'last_name2' , 'age', 'email', 'phone_number'];
  dataSource = new MatTableDataSource<Patient>([]);
  selection = new SelectionModel<Patient>(true, []);

  $headerAction!: Subscription;
  $advanceSearch!: Subscription;

  constructor(
    private backendService : BackendService,
    private router : Router,
    private headerService : HeaderService,
    private utilService : UtilService
    ) { }

  ngOnInit(): void {
    this.getAll({});
    this.headerService.setHeader({name:'patient', type:'list'});
    this.utilService.set({name:'patient', type:'list'});
    this.headerService.setSetupSearch({name:'patient'});
  }

  ngAfterViewInit(): void {
    this.$headerAction! = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'delete':
          this.deletePatients();
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

  getAll(data_search:any){
    this.backendService.getAll(PSYCHOTHERAPY.PATIENT,data_search).subscribe({
      next: (v) => { this.dataSource.data = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  deletePatients(){
    this.backendService.delete(PSYCHOTHERAPY.PATIENT, this.selection.selected.map(function(patient){return patient.id})).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => console.error(e),
      complete: () => this.getAll({})
    });
  }

  viewPatent(patient:Patient){
    this.router.navigate(['main','psychotherapy','patients','form',patient.id]);
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Patient): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }
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