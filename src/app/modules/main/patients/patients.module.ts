import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialAllModule } from 'src/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainViewerModule } from 'src/app/utils/components/main_viewer/main_viewer.module';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDashboardViewComponent } from 'src/app/components/patient/patient-dashboard-view/patient-dashboard-view.component';
import { PatientListViewModule } from 'src/app/components/patient/patient-list-view/patient-list-view.module'

import { PatientService } from 'src/app/services/patient.service';

import { PsychoterapyPatientFormComponent } from 'src/app/components/patient/psychoterapy/psychoterapy_patient-form/psychoterapy_patient-form.component';
import { PsychoterapyPatientShowViewComponent } from 'src/app/components/patient/psychoterapy/psychoterapy_patient-show-view/psychoterapy_patient-show-view.component';
import { EarlyStimulationPatientFormComponent } from 'src/app/components/patient/early_stimulation/early_stimulation_patient-form/early_stimulation_patient-form.component';
import { EarlyStimulationShowViewComponent } from 'src/app/components/patient/early_stimulation/early_stimulation_patient-show-view/early_stimulation_patient-show-view.component';
import { NeuroPsychologyPatientFormComponent } from 'src/app/components/patient/neuro_psychology/neuro_psychology_patient-form/neuro_psychology_patient-form.component';

import { ClinicalHistoryShowViewModule } from 'src/app/components/clinical_history/basic_clinical_history/clinical_history-show-view/clinical_history-show-view.module'

@NgModule({
  declarations: [
    PatientsComponent,
    PatientFormComponent,
    PatientListComponent,
    PsychoterapyPatientFormComponent,
    EarlyStimulationPatientFormComponent,
    EarlyStimulationShowViewComponent,
    NeuroPsychologyPatientFormComponent,
    PatientDashboardViewComponent,
    PsychoterapyPatientShowViewComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    MainViewerModule,
    PatientListViewModule,
    ClinicalHistoryShowViewModule
  ],
  providers: [PatientService]
})
export class PatientsModule { }
