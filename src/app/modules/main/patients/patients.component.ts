import { Component, OnInit } from '@angular/core';

//SERVICES
import { SetupService } from 'src/app/utils/services/setup.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  
  constructor(
    private setupService : SetupService,
  ) { }

  ngOnInit(): void {
    this.setupService.setModule("patient")
    this.setupService.setViewType("dashboard_content");
  }

}
