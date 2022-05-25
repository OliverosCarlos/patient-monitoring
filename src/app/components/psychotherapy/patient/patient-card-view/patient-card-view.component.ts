import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-card-view',
  templateUrl: './patient-card-view.component.html',
  styleUrls: ['./patient-card-view.component.scss']
})
export class PatientCardViewComponent implements OnInit {

  patient_list = [{ id: '', first_name: '', last_name1: '', last_name2: '', age: '', email: '', phone_number: '', image: 'female-placeholder.jpg' }];
  constructor(
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientService.getPatientsList().subscribe({
      next: (v) => { this.patient_list = v },
      error: (e) => console.error(e),
      complete: () => console.info(this.patient_list)
    });
  }

  viewPatient(id:string) {
    this.router.navigate(['psychotherapy','patients', 'form', id]);
  }
}

export interface Patient {
  id: number,
  first_name: string;
  last_name1: string;
  last_name2: string;
  age: number;
  email: string;
  phone_number: string;
}