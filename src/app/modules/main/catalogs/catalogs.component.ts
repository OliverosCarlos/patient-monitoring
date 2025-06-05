import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { slideInAnimation } from 'src/app/utils/animations/routeAnimation';

import { Subscription } from 'rxjs';

//SERVICES
import { SetupService } from 'src/app/utils/services/setup.service';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss'],
})

export class CatalogsComponent implements OnInit, AfterViewInit {

  $setup!: Subscription;

  constructor(
    private setupService : SetupService,
  ) { 

  }

  ngAfterViewInit(): void {
    // this.utilService.set({name:'catalogs', type:'dashboard'});
  }

  ngOnInit(): void {
    this.setupService.setModule("catalogs")
  }

}