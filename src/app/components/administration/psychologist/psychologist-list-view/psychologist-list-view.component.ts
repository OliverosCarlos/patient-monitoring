import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ADMINISTRATION } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';
import { BackendService } from 'src/app/services/backend.service';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-psychologist-list-view',
  templateUrl: './psychologist-list-view.component.html',
  styleUrls: ['./psychologist-list-view.component.scss']
})
export class PsychologistListViewComponent implements OnInit, AfterViewInit {

  displayedColumns = ['select','first_name','last_name1','last_name2','age','email','phone_number','university','studies','profile'];
  dataSource = new MatTableDataSource<Psychologist>([]);
  selection = new SelectionModel<Psychologist>(true, []);

  $headerAction!: Subscription;

  constructor(
    private headerService : HeaderService,
    private utilService : UtilService,
    private backendService : BackendService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.getAllPsychologist();
    this.headerService.setHeader({name:'psychologist', type:'list'});
    this.utilService.set({name:'psychologist', type:'list'});
  }

  ngAfterViewInit(): void {
    this.$headerAction! = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'delete':
          this.deletePsychologists();
          break;

        case 'view':
          this.router.navigate(['main','administration', 'psychologist', data.type]);
          break;
        default:
          break;
      }
    });
  }

  getAllPsychologist(){
    this.backendService.getAll(ADMINISTRATION.PSYCHOLOGIST,{}).subscribe({
      next: (v) => { this.dataSource.data = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  deletePsychologists(){
    this.backendService.delete(ADMINISTRATION.PSYCHOLOGIST,this.selection.selected.map(function(psychologists){return psychologists.id})).subscribe({
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

    viewPsychologist(psychologist: Psychologist){
      this.router.navigate(['main', 'administration', 'psychologist', 'form', psychologist.id]);
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