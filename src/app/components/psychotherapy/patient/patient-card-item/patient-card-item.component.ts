import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS
import { Patient } from 'src/app/models/psychotherapy.model';

@Component({
  selector: 'app-patient-card-item',
  templateUrl: './patient-card-item.component.html',
  styleUrls: ['./patient-card-item.component.scss']
})
export class PatientCardItemComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() patientData: Patient;

  constructor(
    private backendService: BackendService,
    private router : Router,
    private route: ActivatedRoute,
    private headerService : HeaderService,
    private utilService: UtilService
  ) {
    this.patientData = {
      id: 0, 
      first_name: '',
      last_name1: '',
      last_name2: '',
      age: 0,
      email: '',
      phone_number: '',
      image: 'female-placeholder.jpg'
    };

  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
  }


}
