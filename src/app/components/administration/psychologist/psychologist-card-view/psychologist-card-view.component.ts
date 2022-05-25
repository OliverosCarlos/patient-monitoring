import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PsychologistService } from 'src/app/services/administration/psychologist.service';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-psychologist-card-view',
  templateUrl: './psychologist-card-view.component.html',
  styleUrls: ['./psychologist-card-view.component.scss']
})
export class PsychologistCardViewComponent implements OnInit {

  displayedColumns = ['select', 'first_name', 'last_name1', 'last_name2', 'age', 'email', 'phone_number', 'university', 'studies', 'profile'];
  dataSource = new MatTableDataSource<Psychologist>([]);
  selection = new SelectionModel<Psychologist>(true, []);

  psychologist_list = [{ id: '', first_name: '', last_name1: '', last_name2: '', age: '', email: '', phone_number: '', university: '', studies: '', profile: '', image: 'female-placeholder.jpg' }];
  constructor(
    private psychologistService: PsychologistService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllPsychologist();
  }

  getAllPsychologist() {
    this.psychologistService.getPsychologistsList().subscribe({
      next: (v) => { this.psychologist_list = v },
      error: (e) => console.error(e),
      complete: () => console.info(this.psychologist_list)
    });
  }

  deletePsychologists() {
    this.psychologistService.deletePsychologists(this.selection.selected.map(function (psychologists) { return psychologists.id })).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => console.error(e),
      complete: () => this.getAllPsychologist()
    });
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
  checkboxLabel(row?: Psychologist): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  viewPsychologist(id:string) {
    this.router.navigate(['administration', 'form', id]);
  }
}

export interface Psychologist {
  id: number,
  first_name: string,
  last_name1: string,
  last_name2: string,
  age: number,
  email: string,
  phone_number: string,
  university: string,
  studies: string,
  profile: string,
  image: string,
}