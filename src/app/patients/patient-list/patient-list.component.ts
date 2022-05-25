import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  displayedColumns = ['select', 'first_name', 'last_name', 'age'];
  dataSource = new MatTableDataSource<Patient>([]);
  selection = new SelectionModel<Patient>(true, []);

  constructor(
    private patientService : PatientService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients(){
    this.patientService.getPatientsList().subscribe({
      next: (v) => { this.dataSource.data = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  deletePatients(){
    this.patientService.deletePatients(this.selection.selected.map(function(patient){return patient.id})).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => console.error(e),
      complete: () => this.getAllPatients()
    });
  }

  viewPatent(patient:Patient){
    this.router.navigate(['patients','form',patient.id]);

// Navigate without updating the URL, overriding the default behavior
// router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
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
  last_name: string;
  age: number;
}