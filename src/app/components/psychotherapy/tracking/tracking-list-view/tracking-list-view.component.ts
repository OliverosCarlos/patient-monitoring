//File generated by vaweei CLI
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//SERVICE
import { HeaderService } from 'src/app/services/header.service';
import { HobbiesInterestService } from 'src/app/services/catalogs/hobbies_interest.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS
import { Hobbies_Interest } from 'src/app/models/hobbies_interest.model';


import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tracking-list-view',
  templateUrl: './tracking-list-view.component.html',
  styleUrls: ['./tracking-list-view.component.scss']
})
export class TrackingListViewComponent implements OnInit {

  displayedColumns = ['select' , 'code' , 'name'  ];
  dataSource = new MatTableDataSource<Hobbies_Interest>([]);
  selection = new SelectionModel<Hobbies_Interest>(true, []);

  $headerAction!: Subscription;

  constructor(
    private router : Router,
    private headerService : HeaderService,
    private hobbiesInterestService : HobbiesInterestService,
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
    this.headerService.setHeader({name:'track',type:'list'});
    this.utilService.set({name:'track', type:'list'});
  }

  getAll(){
   this.hobbiesInterestService.getHobbiesInterestsList().subscribe({
     next: (v) => { this.dataSource.data = v },
     error: (e) => console.error(e),
     complete: () => console.info('complete')
   });
  }

  deleteHobbies_Interest(){
    this.hobbiesInterestService.deleteHobbiesInterests(this.selection.selected.map(function(hobbies_interest_data){return hobbies_interest_data.id})).subscribe({
     next: (v) => { console.log(v) },
     error: (e) => console.error(e),
     complete: () => this.getAll()
    });
  }

  show(hobbies_interest_data:Hobbies_Interest){
    this.router.navigate(['psychotherapy','track','form',hobbies_interest_data.id]);
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
    checkboxLabel(row?: Hobbies_Interest): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    delete(){
      this.hobbiesInterestService.deleteHobbiesInterests(this.selection.selected.map(function(hobbies_interest){return hobbies_interest.id})).subscribe({
        next: (v) => { console.log(v) },
        error: (e) => console.error(e),
        complete: () => this.getAll()
      });
    }

}
    