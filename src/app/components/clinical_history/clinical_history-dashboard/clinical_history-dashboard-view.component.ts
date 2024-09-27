import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';

import { NEUROPSYCHO, CATALOGS } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { UtilService } from 'src/app/services/util.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-clinical_history-dashboard-view',
  templateUrl: './clinical_history-dashboard-view.component.html',
  styleUrls: ['./clinical_history-dashboard-view.component.scss']
})
export class ClinicalHistoryDashboardViewComponent implements OnInit, OnDestroy, AfterViewInit {

  data = []
  medical_history_count = 0;

  constructor(
    private utilService : UtilService,
    private backendService : BackendService,
  ) {}

  ngOnInit() {
    this.utilService.set({name:'clinical-history', type:'dashboard'});
    this.getAll({});
  }
  
  ngAfterViewInit(): void {

  }

  getAll(data_search:any){
    this.backendService.getAll(NEUROPSYCHO.MEDICAL_HISTORY,data_search).subscribe({
      next: (v) => { this.data = v; this.buildData(v); console.log(v);},
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
   }

  ngOnDestroy() {
  }

  buildData(data: any){

  }

}
