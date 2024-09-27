import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClinicalHistoryComponent } from './clinical_history.component';

import { ClinicalHistoryDashboardViewComponent } from 'src/app/components/clinical_history/clinical_history-dashboard/clinical_history-dashboard-view.component';
import { EarlyStimulationFormViewComponent } from 'src/app/components/clinical_history/early_stimulation-form-view/early_stimulation-form-view.component';
import { EarlyStimulationListViewComponent } from 'src/app/components/clinical_history/early_stimulation-list-view/early_stimulation-list-view.component';
import { EarlyStimulationShowViewComponent } from 'src/app/components/clinical_history/early_stimulation-show-view/early_stimulation-show-view.component';
import { EarlyStimulationReportFormViewComponent } from 'src/app/components/clinical_history/early_stimulation_report-form-view/early_stimulation_report-form-view.component'
import { EarlyStimulationReportShowViewComponent } from "src/app/components/clinical_history/early_stimulation_report-show-view/early_stimulation_report-show-view.component";

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';

const routes: Routes = [
  { path: '', component: ClinicalHistoryDashboardViewComponent, data: { breadcrumb: 'Historia Clinica' }},
  { path: 'early-stimulation', component: ClinicalHistoryComponent, data: { breadcrumb: 'Estimulación Temprana' },
    children:[
      { path: 'list', component: EarlyStimulationListViewComponent, data: { breadcrumb: 'Lista',  animation: true }, canActivate: [CanActivateLogged] },
      { path: 'form', component: EarlyStimulationFormViewComponent, data: { breadcrumb: 'Creación',  animation: true }, canActivate: [CanActivateLogged] },
      { path: 'show/:early_stimulation_id', component: EarlyStimulationShowViewComponent, data: { breadcrumb: "Visualizar",  animation: true } },
      { path: 'report-form/:medical_history_id', component: EarlyStimulationReportFormViewComponent, data: { breadcrumb: "Reporte",  animation: true } },
      { path: 'report-show/:medical_history_report_id', component: EarlyStimulationReportShowViewComponent, data: { breadcrumb: "Reporte",  animation: true } },
      { path: 'report-update/:medical_history_report_id', component: EarlyStimulationReportFormViewComponent, data: { breadcrumb: "Reporte",  animation: true } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicalHistoryRoutingModule { }
