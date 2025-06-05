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
import { MainViewerModule } from 'src/app/utils/components/main_viewer/main_viewer.module';

import { ClinicalHistoryRoutingModule } from './clinical_history-routing.module';
import { ClinicalHistoryComponent } from './clinical_history.component';
import { PatientSelectModule } from 'src/app/components/psychotherapy/patient/patient-select/patient-select.module';


import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';

import { ClinicalHistoryDashboardViewComponent } from 'src/app/components/clinical_history/clinical_history-dashboard/clinical_history-dashboard-view.component';
import { BasicClinicalHistoryFormViewComponent } from 'src/app/components/clinical_history/basic_clinical_history/basic_clinical_history-form-view/basic_clinical_history-form-view.component';
import { EarlyStimulationFormViewComponent } from 'src/app/components/clinical_history/early_stimulation-form-view/early_stimulation-form-view.component';
import { EarlyStimulationListViewComponent } from 'src/app/components/clinical_history/early_stimulation-list-view/early_stimulation-list-view.component';
import { EarlyStimulationShowViewComponent } from 'src/app/components/clinical_history/early_stimulation-show-view/early_stimulation-show-view.component';
import { EarlyStimulationReportFormViewComponent } from 'src/app/components/clinical_history/early_stimulation_report-form-view/early_stimulation_report-form-view.component'; 
import { EarlyStimulationReportShowViewComponent } from "src/app/components/clinical_history/early_stimulation_report-show-view/early_stimulation_report-show-view.component";
import { PatientEarlyStimulationSelectModule } from 'src/app/components/patient/early_stimulation/patient_early_stimulation-select/patient_early_stimulation-select.module'

import { PatientFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/patient-form-view/patient-form-view.module'
import { ReasonConsultationFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/reason_consultation-form-view/reason_consultation-form-view.module';
import { EmotionsFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/emotions-form-view/emotions-form-view.module';
import { BehaviorFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/behavior-form-view/behavior-form-view.module';
import { NonVerbalLanguageFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/nonverbal_language-form-view/nonverbal_language-form-view.module';
import { HobbiesInterestsFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/hobbies_interests-form-view/hobbies_interests-form-view.module';
import { SchoolAreaFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/school_area-form-view/school_area-form-view.module';
import { FamilyAreaFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/family_area-form-view/family_area-form-view.module';
import { SocialAreaFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/social_area-form-view/social_area-form-view.module';
import { PersonalCharacteristicsFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/personal_characteristics-form-view/personal_characteristics-form-view.module';
import { TherapyObjectivesFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/therapy_objectives-form-view/therapy_objectives-form-view.module';
import { ApproachFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/approach-form-view/approach-form-view.module';
import { FunctionalityAnalysisFormModalComponent } from 'src/app/components/clinical_history/basic_clinical_history/functionality_analysis/functionality_analysis-form-modal/functionality_analysis-form-modal.component'; 
import { FunctionalityAnalysisFormViewModule } from 'src/app/components/clinical_history/basic_clinical_history/functionality_analysis/functionality_analysis-form-view/functionality_analysis-form-view.module';
import { FunctionalityAnalysisListViewModule } from 'src/app/components/clinical_history/basic_clinical_history/functionality_analysis/functionality_analysis-list-view/functionality_analysis-list-view.module'; 

import { SupportNetworkListViewModule } from 'src/app/components/clinical_history/basic_clinical_history/support_network/support_network-list-view/support_network-list-view.module';
import { SupportNetworkFormModalModule } from 'src/app/components/clinical_history/basic_clinical_history/support_network/support_network-form-modal/support_network-form-modal.module';

import { ClinicalhistoryListViewComponent } from 'src/app/components/clinical_history/basic_clinical_history/clinical_history-list-view/clinical_history-list-view.component';
import { ClinicalHistoryShowViewComponent } from 'src/app/components/clinical_history/basic_clinical_history/clinical_history-show-view/clinical_history-show-view.component';
import { ClinicalHistoryShowViewModule } from 'src/app/components/clinical_history/basic_clinical_history/clinical_history-show-view/clinical_history-show-view.module'

import { ClinicalNoteFormViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-form-view/clinical_note-form-view.component';
import { ClinicalNoteListViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-list-view/clinical_note-list-view.component';
import { ClinicalNoteShowFormViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-show-form-view/clinical_note-show-form-view.component';
import { ClinicalNoteUpdateFormViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-update-form-view/clinical_note-update-form-view.component';
import { ClinicalNoteFormDashboardViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-form-dashboard-view/clinical_note-form-dashboard-view.component';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({
  declarations: [
    ClinicalHistoryComponent,
    ClinicalHistoryDashboardViewComponent,
    BasicClinicalHistoryFormViewComponent,
    EarlyStimulationFormViewComponent,
    EarlyStimulationListViewComponent,
    EarlyStimulationShowViewComponent,
    EarlyStimulationReportFormViewComponent,
    EarlyStimulationReportShowViewComponent,
    FunctionalityAnalysisFormModalComponent,
    ClinicalhistoryListViewComponent,
    // ClinicalHistoryShowViewComponent,
    ClinicalNoteFormViewComponent,
    ClinicalNoteListViewComponent,
    ClinicalNoteShowFormViewComponent,
    ClinicalNoteUpdateFormViewComponent,
    ClinicalNoteFormDashboardViewComponent
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
    safehtmlModule,
    MainViewerModule,
    PatientSelectModule,
    PatientFormViewModule,
    ReasonConsultationFormViewModule,
    EmotionsFormViewModule,
    BehaviorFormViewModule,
    NonVerbalLanguageFormViewModule,
    HobbiesInterestsFormViewModule,
    SchoolAreaFormViewModule,
    FamilyAreaFormViewModule,
    SocialAreaFormViewModule,
    PersonalCharacteristicsFormViewModule,
    TherapyObjectivesFormViewModule,
    ApproachFormViewModule,
    FunctionalityAnalysisFormViewModule,
    FunctionalityAnalysisListViewModule,
    SupportNetworkListViewModule,
    SupportNetworkFormModalModule,
    PatientEarlyStimulationSelectModule
    
  ],
  providers: [
    CanActivateLogged
  ]
})
export class ClinicalHistoryModule { }
