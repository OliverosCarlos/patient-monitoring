import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';

import { NEUROPSYCHO, CATALOGS } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { UtilService } from 'src/app/services/util.service';
import { BackendService } from 'src/app/services/backend.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type chartOptionsPIE = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-clinical_history-dashboard-view',
  templateUrl: './clinical_history-dashboard-view.component.html',
  styleUrls: ['./clinical_history-dashboard-view.component.scss']
})
export class ClinicalHistoryDashboardViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>
  public chartOptionsPIE: Partial<chartOptionsPIE>

  data = []
  medical_history_count = 0;

  constructor(
    private utilService : UtilService,
    private backendService : BackendService,
  ) {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 250,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };

    this.chartOptionsPIE = {
      series: [44, 55, 13, 43, 22],
      chart: {
        height: 250,

        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

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
    this.medical_history_count = data.length
  }

}
