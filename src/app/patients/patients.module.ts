import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialAllModule } from 'src/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';

import { PatientService } from 'src/app/services/patient.service';

@NgModule({
  declarations: [
    PatientsComponent,
    PatientFormComponent,
    PatientListComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PatientService]
})
export class PatientsModule { }
