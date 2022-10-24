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

@Component({
  selector: 'app-task_assigned-list-view',
  templateUrl: './task_assigned-list-view.component.html',
  styleUrls: ['./task_assigned-list-view.component.scss']
})
export class TaskAssignedListViewComponent implements OnInit {

  displayedColumns = ['select' , 'code' , 'name'  ];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  $headerAction!: Subscription;

  constructor(
    private router : Router,
    private headerService : HeaderService,
    private backendService : BackendService,
    private utilService: UtilService
    ) {}

  ngAfterViewInit(): void {
    this.$headerAction! = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'delete':
          this.delete();
          break;
      
        default:
          break;
      }
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.headerService.setHeader({name:'hobbies_interest',type:'list'});
    this.utilService.set({name:'hobbies_interest', type:'list'});
  }

  getAll(){
   this.backendService.getOneById(PSYCHOTHERAPY.PATIENTS_TASKS_ASSIGNED_BY_PATIENT, '11').subscribe({
     next: (v) => { this.dataSource.data = v; console.log(v);
      },
     error: (e) => console.error(e),
     complete: () => console.info('complete')
   });
  }

  deleteHobbies_Interest(){
    this.backendService.delete(PSYCHOTHERAPY.PATIENTS_TASKS_ASSIGNED ,this.selection.selected.map(function(hobbies_interest_data){return hobbies_interest_data.id})).subscribe({
     next: (v) => { console.log(v) },
     error: (e) => console.error(e),
     complete: () => this.getAll()
    });
  }

  show(hobbies_interest_data:any){
    this.router.navigate(['main','catalogs','hobbies-interest','form',hobbies_interest_data.id]);
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
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    delete(){
      // this.backendService.delete(CATALOGS.HOBBIES_INTEREST ,this.selection.selected.map(function(hobbies_interest){return hobbies_interest.id})).subscribe({
      //   next: (v) => { console.log(v) },
      //   error: (e) => console.error(e),
      //   complete: () => this.getAll()
      // });
    }
}
