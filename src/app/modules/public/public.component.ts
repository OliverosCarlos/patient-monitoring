import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Subscription } from 'rxjs';

import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

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
  
  shouldRun = true;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

}
