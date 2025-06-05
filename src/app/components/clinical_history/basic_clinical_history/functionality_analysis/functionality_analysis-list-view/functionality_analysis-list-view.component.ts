import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//SERVICES
import { EmotionsService } from 'src/app/services/catalogs/emotions.service';
import { Functionality_analysisService } from 'src/app/services/clinical_note/functionality_analysis.service';
import { UtilService } from 'src/app/services/util.service';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-functionality_analysis-list-view',
  templateUrl: './functionality_analysis-list-view.component.html',
  styleUrls: ['./functionality_analysis-list-view.component.scss']
})
export class FunctionalityAnalysisListViewComponent implements OnInit, AfterViewInit {

  displayedColumns = ['select','emotion_name','conduct','functionality'];
  dataSource = new MatTableDataSource<Emotion>([]);
  selection = new SelectionModel<Emotion>(true, []);
  dataList: any = [];

  suscribeFucntionalityAnalysisService!: Subscription;

  constructor(
    private emotionsService : EmotionsService,
    private router : Router,
    private functionality_analysisService: Functionality_analysisService,
    private utilService: UtilService
    ) { }

  ngOnInit(): void {
    this.getAllEmotions();
  }

  ngAfterViewInit(): void {
    this.suscribeFucntionalityAnalysisService = this.functionality_analysisService.get().subscribe(data => {
      this.dataList.push(data);
      this.dataSource.data = this.dataList;
      this.utilService.setFunctionalityAnalysisClinicalNote(this.dataList);
    });
  }

  getAllEmotions(){
    // this.emotionsService.getEmotionsList().subscribe({
    //   next: (v) => { this.dataSource.data = v },
    //   error: (e) => console.error(e),
    //   complete: () => console.info('complete')
    // });
  }

  deletePsychologists(){
    this.emotionsService.deleteEmotions(this.selection.selected.map(function(emotion){return emotion.id})).subscribe({
      next: (v) => { console.log(v) },
      error: (e) => console.error(e),
      complete: () => this.getAllEmotions()
    });
  }

  viewEmotion(emotion:Emotion){
    this.router.navigate(['catalogs','emotions','form',emotion.id]);
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

    tst(){
      // this.emotionsService.getTst().subscribe({
      //   next: (v) => { console.log(v) },
      //   error: (e) => console.error(e),
      //   complete: () => console.info('complete')
      // });
    }
}

export interface Emotion {
  id: number,
  code: string,
  name: string,
  description: string,
  color: string
}