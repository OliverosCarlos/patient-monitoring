import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialAllModule } from 'src/material.module'
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { ColorCircleModule } from 'ngx-color/circle';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxEditorModule } from 'ngx-editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgApexchartsModule } from "ng-apexcharts";
import { safehtmlModule } from 'src/app/utils/components/custom_pipes/safehtml.module'

import { ClinicalHistoryRoutingModule } from './clinical_history-routing.module';
import { ClinicalHistoryComponent } from './clinical_history.component';

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';

import { ClinicalHistoryDashboardViewComponent } from 'src/app/components/clinical_history/clinical_history-dashboard/clinical_history-dashboard-view.component';
import { EarlyStimulationFormViewComponent } from 'src/app/components/clinical_history/early_stimulation-form-view/early_stimulation-form-view.component';
import { EarlyStimulationListViewComponent } from 'src/app/components/clinical_history/early_stimulation-list-view/early_stimulation-list-view.component';
import { EarlyStimulationShowViewComponent } from 'src/app/components/clinical_history/early_stimulation-show-view/early_stimulation-show-view.component';
import { EarlyStimulationReportFormViewComponent } from 'src/app/components/clinical_history/early_stimulation_report-form-view/early_stimulation_report-form-view.component'; 
import { EarlyStimulationReportShowViewComponent } from "src/app/components/clinical_history/early_stimulation_report-show-view/early_stimulation_report-show-view.component";

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({
  declarations: [
    ClinicalHistoryComponent,
    ClinicalHistoryDashboardViewComponent,
    EarlyStimulationFormViewComponent,
    EarlyStimulationListViewComponent,
    EarlyStimulationShowViewComponent,
    EarlyStimulationReportFormViewComponent,
    EarlyStimulationReportShowViewComponent,
  ],
  imports: [
    CommonModule,
    ClinicalHistoryRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    ColorCircleModule,
    NgbDatepickerModule,
    MatTabsModule,
    AngularEditorModule,
    NgxEditorModule,
    CKEditorModule,
    NgApexchartsModule,
    safehtmlModule
  ],
  providers: [
    CanActivateLogged
  ]
})
export class ClinicalHistoryModule { }
