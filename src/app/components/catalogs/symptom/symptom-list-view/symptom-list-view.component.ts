import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CATALOGS } from 'src/app/utils/setup/routes.enum'; 

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

import { Subscription } from 'rxjs';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-symptom-list-view',
  templateUrl: './symptom-list-view.component.html',
  styleUrls: ['./symptom-list-view.component.scss']
})
export class SymptomListViewComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['select','code','name', 'color'];
  dataSource = new MatTableDataSource<Symptom>([]);
  selection = new SelectionModel<Symptom>(true, []);

  $headerAction!: Subscription;
  $advanceSearch!: Subscription;

  constructor(
    private backendService : BackendService,
    private router : Router,
    private headerService: HeaderService,
    private utilService: UtilService
    ) { }

  ngOnInit(): void {
    this.getAll({});
    this.headerService.setHeader({name:'symptom',type:'list'});
    this.utilService.set({name:'symptom', type:'list'});
    this.headerService.setSetupSearch({name:'symptom'});
  }

  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      console.log(data)
      switch (data.action) {
        case 'delete':
          this.delete();
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
  }

  getAll(data_search:any){
    this.backendService.getAll(CATALOGS.SYMPTOMS, data_search).subscribe({
      next: (v) => { this.dataSource.data = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  delete(){
    this.backendService.delete(CATALOGS.SYMPTOMS ,this.selection.selected.map(function(symptom){return symptom.id})).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => console.error(e),
      complete: () => this.getAll({})
    });
  }

  viewSymptom(symptom:Symptom){
    this.router.navigate(['main','catalogs','symptom','form',symptom.id]);
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
    checkboxLabel(row?: Symptom): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    tst(){
      // this.emotionsService.getTst().subscribe({
      //   next: (v) => { console.log(v) },
      //   error: (e) => console.error(e),
      //   complete: () => console.info('complete')
      // });
    }
}

export interface Symptom {
  id: number,
  code: string,
  name: string
}