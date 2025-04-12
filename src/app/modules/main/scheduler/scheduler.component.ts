import { Component, OnInit } from '@angular/core';

//SERVICES
import { SetupService } from 'src/app/utils/services/setup.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  constructor(
    private setupService : SetupService,
  ) { }

  ngOnInit(): void {
    this.setupService.setModule("scheduler");
    this.setupService.setViewType("dashboard_content");
  }

}
