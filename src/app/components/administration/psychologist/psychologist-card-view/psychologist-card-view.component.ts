import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ADMINISTRATION } from 'src/app/utils/setup/routes.enum';
import { Subscription } from 'rxjs';

//SERVICES
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';
import { BackendService } from 'src/app/services/backend.service';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-psychologist-card-view',
  templateUrl: './psychologist-card-view.component.html',
  styleUrls: ['./psychologist-card-view.component.scss']
})
export class PsychologistCardViewComponent implements OnInit, AfterViewInit {

  displayedColumns = ['select', 'first_name', 'last_name1', 'last_name2', 'age', 'email', 'phone_number', 'university', 'studies', 'profile'];
  dataSource = new MatTableDataSource<Psychologist>([]);
  selection = new SelectionModel<Psychologist>(true, []);

  psychologist_list = [{ id: '', first_name: '', last_name1: '', last_name2: '', age: '', email: '', phone_number: '', university: '', studies: '', profile: '', image: 'female-placeholder.jpg' }];

  $headerAction!: Subscription;

  constructor(
    private headerService : HeaderService,
    private utilService : UtilService,
    private BackendService: BackendService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllPsychologist();
  }

  ngAfterViewInit(): void {
    this.$headerAction! = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'delete':
          this.deletePsychologists();
          break;
      
        default:
          break;
      }
    });
  }

  getAllPsychologist() {
    this.BackendService.getAll(ADMINISTRATION.PSYCHOLOGIST,{}).subscribe({
      next: (v) => { this.psychologist_list = v },
      error: (e) => console.error(e),
      complete: () => console.info(this.psychologist_list)
    });
  }

  deletePsychologists() {
    this.BackendService.delete(ADMINISTRATION.PSYCHOLOGIST ,this.selection.selected.map(function (psychologists) { return psychologists.id })).subscribe({
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