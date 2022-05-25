import { ViewChild, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Subscription } from 'rxjs';

import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'patient-monitoring';
  events: string[] = [];
  opened: boolean = false;

  $platformService!: Subscription;
  platformTitle = '';
  platformSubtitle = '';

  constructor(private utilService : UtilService) {}

  ngOnInit(): void {
    this.$platformService = this.utilService.get().subscribe(data => {
      this.platformTitle = data.title;
      this.platformSubtitle = data.subtitle;
    });
  }

  // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  shouldRun = true;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;


}
