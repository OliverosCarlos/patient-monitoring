import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClinicalHistoryComponent } from './clinical_history.component';

import { ClinicalHistoryDashboardViewComponent } from 'src/app/components/clinical_history/clinical_history-dashboard/clinical_history-dashboard-view.component';
import { BasicClinicalHistoryFormViewComponent } from 'src/app/components/clinical_history/basic_clinical_history/basic_clinical_history-form-view/basic_clinical_history-form-view.component';
import { ClinicalhistoryListViewComponent } from 'src/app/components/clinical_history/basic_clinical_history/clinical_history-list-view/clinical_history-list-view.component';
import { ClinicalHistoryShowViewComponent } from 'src/app/components/clinical_history/basic_clinical_history/clinical_history-show-view/clinical_history-show-view.component';

import { EarlyStimulationFormViewComponent } from 'src/app/components/clinical_history/early_stimulation-form-view/early_stimulation-form-view.component';
import { EarlyStimulationListViewComponent } from 'src/app/components/clinical_history/early_stimulation-list-view/early_stimulation-list-view.component';
import { EarlyStimulationShowViewComponent } from 'src/app/components/clinical_history/early_stimulation-show-view/early_stimulation-show-view.component';
import { EarlyStimulationReportFormViewComponent } from 'src/app/components/clinical_history/early_stimulation_report-form-view/early_stimulation_report-form-view.component'
import { EarlyStimulationReportShowViewComponent } from "src/app/components/clinical_history/early_stimulation_report-show-view/early_stimulation_report-show-view.component";

import { ClinicalNoteFormViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-form-view/clinical_note-form-view.component';
import { ClinicalNoteListViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-list-view/clinical_note-list-view.component';
import { ClinicalNoteShowFormViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-show-form-view/clinical_note-show-form-view.component';
import { ClinicalNoteUpdateFormViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-update-form-view/clinical_note-update-form-view.component';
import { ClinicalNoteFormDashboardViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-form-dashboard-view/clinical_note-form-dashboard-view.component';

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';

const routes: Routes = [
  { path: '', component: ClinicalHistoryComponent, data: { breadcrumb: 'Historia Clinica' },
    children:[
      { path: '', component: ClinicalHistoryDashboardViewComponent, data: { breadcrumb: 'Dashboard' }},
      { path: 'basic-clinical-history/list', component: ClinicalhistoryListViewComponent, data: { breadcrumb: 'Psicoterapia' }},
      { path: 'basic-clinical-history/form', component: BasicClinicalHistoryFormViewComponent, data: { breadcrumb: 'Psicoterapia' }},
      { path: 'basic-clinical-history/show/:id', component: ClinicalHistoryShowViewComponent, data: { breadcrumb: 'Psicoterapia' }},
      { path: 'neuro-psychology/form', component: BasicClinicalHistoryFormViewComponent, data: { breadcrumb: 'Neuro Psicología' } },
      // { path: 'early-stimulation/form', component: EarlyStimulationFormViewComponent, data: { breadcrumb: 'Estimulación Temprana' } },
      // { path: 'early-stimulation/list', component: EarlyStimulationListViewComponent, data: { breadcrumb: 'Lista',  animation: true }, canActivate: [CanActivateLogged] },
      { path: 'early-stimulation/list', component: EarlyStimulationListViewComponent, data: { breadcrumb: 'Lista',  animation: true }, canActivate: [CanActivateLogged] },
      { path: 'early-stimulation/form', component: EarlyStimulationFormViewComponent, data: { breadcrumb: 'Creación',  animation: true }, canActivate: [CanActivateLogged] },
      { path: 'early-stimulation/show/:early_stimulation_id', component: EarlyStimulationShowViewComponent, data: { breadcrumb: "Visualizar",  animation: true } },
      { path: 'early-stimulation/report-form/:medical_history_id', component: EarlyStimulationReportFormViewComponent, data: { breadcrumb: "Reporte",  animation: true } },
      { path: 'early-stimulation/report-show/:medical_history_report_id', component: EarlyStimulationReportShowViewComponent, data: { breadcrumb: "Reporte",  animation: true } },
      { path: 'early-stimulation/report-update/:medical_history_report_id', component: EarlyStimulationReportFormViewComponent, data: { breadcrumb: "Reporte",  animation: true } },

      { path: 'clinical_note/list', component:  ClinicalNoteListViewComponent, data: { breadcrumb: 'Seguimiento' }  },
      { path: 'clinical_note/list/by_patient/:patient_id', component:  ClinicalNoteListViewComponent, data: { breadcrumb: 'Seguimiento' }  },
      { path: 'clinical_note/form', component: ClinicalNoteFormViewComponent , data: { breadcrumb: 'Nuevo' }  },
      { path: 'clinical_note/form/:tracking_id', component: ClinicalNoteShowFormViewComponent, data: { breadcrumb: 'Nuevo' }  },
      { path: 'clinical_note/update/:tracking_id', component: ClinicalNoteUpdateFormViewComponent, data: { breadcrumb: 'Seguimiento' }  },
      { path: 'clinical_note/form/dashboard/:patient_id', component: ClinicalNoteFormDashboardViewComponent, data: { breadcrumb: 'Nota Clinica' }  },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicalHistoryRoutingModule { }
