import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-patient-show-view',
  templateUrl: './patient-show-view.component.html',
  styleUrls: ['./patient-show-view.component.scss']
})
export class PatientShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

  patient = { 
    id: '', 
    first_name: '',
    last_name1: '',
    last_name2: '',
    age: '',
    email: '',
    phone_number: '',
    image: 'female-placeholder.jpg'
  };


  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('patient_id')){
      this.getPatientById(this.route.snapshot.paramMap.get('patient_id'));
    }
  }
  
  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getPatientById(id:any){
    if(id){
      this.patientService.getPatientById(id).subscribe({
        next: (v) => { this.patient = v[0] },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

}
