import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';

//models

@Component({
  selector: 'app-evaluations-dashboard-view',
  templateUrl: './evaluations-dashboard-view.component.html',
  styleUrls: ['./evaluations-dashboard-view.component.scss']
})
export class EvaluationsDashboardViewComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
  ) {}

  ngOnInit() {

  }
  
  ngAfterViewInit(): void {

  }

  ngOnDestroy() {
  }

}
