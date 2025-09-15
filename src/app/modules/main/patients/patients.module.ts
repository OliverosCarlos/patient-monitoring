import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialAllModule } from 'src/material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainViewerModule } from 'src/app/utils/components/main_viewer/main_viewer.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomPipesModule } from 'src/app/utils/components/custom_pipes/custom_pipes.module';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDashboardViewComponent } from 'src/app/components/patient/patient-dashboard-view/patient-dashboard-view.component';
import { PatientListViewModule } from 'src/app/components/patient/patient-list-view/patient-list-view.module'

import { PatientService } from 'src/app/services/patient.service';

import { PsychoterapyPatientListViewComponent } from 'src/app/components/patient/psychoterapy/psychoterapy_patient-list-view/psychoterapy_patient-list-view.component';
import { PsychoterapyPatientFormComponent } from 'src/app/components/patient/psychoterapy/psychoterapy_patient-form/psychoterapy_patient-form.component';
import { PsychoterapyPatientShowViewComponent } from 'src/app/components/patient/psychoterapy/psychoterapy_patient-show-view/psychoterapy_patient-show-view.component';
import { EarlyStimulationPatientListViewComponent } from 'src/app/components/patient/early_stimulation/early_stimulation_patient-list-view/early_stimulation_patient-list-view.component';
import { EarlyStimulationPatientFormComponent } from 'src/app/components/patient/early_stimulation/early_stimulation_patient-form/early_stimulation_patient-form.component';
import { EarlyStimulationShowViewComponent } from 'src/app/components/patient/early_stimulation/early_stimulation_patient-show-view/early_stimulation_patient-show-view.component';
import { NeuroPsychologyPatientListViewComponent } from 'src/app/components/patient/neuro_psychology/neuro_psychology_patient-list-view/neuro_psychology_patient-list-view.component';
import { NeuroPsychologyPatientFormComponent } from 'src/app/components/patient/neuro_psychology/neuro_psychology_patient-form/neuro_psychology_patient-form.component';
import { NeuroPsychologyShowViewComponent } from 'src/app/components/patient/neuro_psychology/neuro_psychology-show-view/neuro_psychology-show-view.component';
import { ClinicalHistoryShowViewModule } from 'src/app/components/clinical_history/basic_clinical_history/clinical_history-show-view/clinical_history-show-view.module'
import { ClinicalNoteByPatientListViewModule } from 'src/app/components/clinical_history/clinical_note/clinical_note_by_patient-list-view/clinical_note_by_patient-list-view.module';
import { ClinicalHistoryEarlyStimulationShowViewModule } from 'src/app/components/patient/early_stimulation/clinical_history_early_stimulation-show-view/clinical_history_early_stimulation-show-view.module'

@NgModule({
  declarations: [
    PatientsComponent,
    PatientFormComponent,
    PatientListComponent,
    PsychoterapyPatientListViewComponent,
    PsychoterapyPatientFormComponent,
    EarlyStimulationPatientListViewComponent,
    EarlyStimulationPatientFormComponent,
    EarlyStimulationShowViewComponent,
    NeuroPsychologyPatientListViewComponent,
    NeuroPsychologyPatientFormComponent,
    NeuroPsychologyShowViewComponent,
    PatientDashboardViewComponent,
    PsychoterapyPatientShowViewComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    MainViewerModule,
    PatientListViewModule,
    ClinicalHistoryShowViewModule,
    NgxSpinnerModule,
    ClinicalNoteByPatientListViewModule,
    ClinicalHistoryEarlyStimulationShowViewModule,
    CustomPipesModule
  ],
  providers: [PatientService]
})
export class PatientsModule { }
