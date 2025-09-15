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

  displayedColumns = ['emotion_name','conduct','functionality'];
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
  }

  ngAfterViewInit(): void {
    this.suscribeFucntionalityAnalysisService = this.functionality_analysisService.get().subscribe(data => {
      this.dataSource.data = data;
    });
  }

}

export interface Emotion {
  id: number,
  code: string,
  name: string,
  description: string,
  color: string
}