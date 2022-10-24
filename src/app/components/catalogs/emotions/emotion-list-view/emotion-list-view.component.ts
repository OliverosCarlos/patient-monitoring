import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CATALOGS} from 'src/app/utils/setup/routes.enum';

//services
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//models
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-emotion-list-view',
  templateUrl: './emotion-list-view.component.html',
  styleUrls: ['./emotion-list-view.component.scss']
})
export class EmotionListViewComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['select','code','name','description','color'];
  dataSource = new MatTableDataSource<Emotion>([]);
  selection = new SelectionModel<Emotion>(true, []);

  $headerAction!: Subscription;

  constructor(
    private backendService : BackendService,
    private router : Router,
    private headerService : HeaderService,
    private utilService: UtilService
    ) { }

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

  ngOnInit(): void {
    this.getAllEmotions();
    this.headerService.setHeader({name:'emotion',type:'list'});
    this.utilService.set({name:'emotion', type:'list'});
  }

  ngOnDestroy():void{
    this.$headerAction!.unsubscribe();
  }

  getAllEmotions(){
    this.backendService.getAll(CATALOGS.EMOTIONS).subscribe({
      next: (v) => { this.dataSource.data = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  deletePsychologists(){
    this.backendService.delete(CATALOGS.EMOTIONS,this.selection.selected.map(function(emotion){return emotion.id})).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => console.error(e),
      complete: () => this.getAllEmotions()
    });
  }

  viewEmotion(emotion:Emotion){
    this.router.navigate(['main','catalogs','emotions','form',emotion.id]);
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
    checkboxLabel(row?: Emotion): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

}

export interface Emotion {
  id: number,
  code: string,
  name: string,
  description: string,
  color: string
}