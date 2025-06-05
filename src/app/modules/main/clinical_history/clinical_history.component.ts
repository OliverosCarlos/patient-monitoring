import { Component, OnInit } from '@angular/core';

//SERVICES
import { SetupService } from 'src/app/utils/services/setup.service';

@Component({
  selector: 'app-clinical_history',
  templateUrl: './clinical_history.component.html',
  styleUrls: ['./clinical_history.component.scss']
})
export class ClinicalHistoryComponent implements OnInit {

  constructor(
    private setupService : SetupService,
  ) { }

  ngOnInit(): void {
    this.setupService.setModule("clinical-history")
  }

}
