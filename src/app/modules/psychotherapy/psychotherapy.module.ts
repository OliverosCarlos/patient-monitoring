import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module'
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { PsychotherapyRoutingModule } from './psychotherapy-routing.module';
import { PsychotherapyComponent } from './psychotherapy.component';

import { PatientListViewComponent } from 'src/app/components/psychotherapy/patient/patient-list-view/patient-list-view.component';
import { PatientCardViewComponent } from 'src/app/components/psychotherapy/patient/patient-card-view/patient-card-view.component';
import { PatientFormComponent } from 'src/app/components/psychotherapy/patient/patient-form/patient-form.component';
import { PatientShowViewComponent } from 'src/app/components/psychotherapy/patient/patient-show-view/patient-show-view.component';

import { ClinicalNoteFormComponent } from 'src/app/components/clinical_note/clinical-note-form/clinical-note-form.component';
import { Clinical_NoteListViewComponent } from 'src/app/components/clinical_note/clinical-note-list-view/clinical-note-list-view.component';
import { ClinicalNoteShowFormViewComponent } from 'src/app/components/clinical_note/clinical_note-show-view/clinical_note-show-form-view.component'

import { TrackingFormViewComponent } from 'src/app/components/psychotherapy/tracking/tracking-form-view/tracking-form-view.component';
import { TrackingListViewComponent } from 'src/app/components/psychotherapy/tracking/tracking-list-view/tracking-list-view.component';
import { TrackingShowFormViewComponent } from 'src/app/components/psychotherapy/tracking/tracking-show-form-view/tracking-show-form-view.component';
import { TrackingUpdateFormViewComponent } from 'src/app/components/psychotherapy/tracking/tracking-update-form-view/tracking-update-form-view.component';

import { TaskDashboardViewComponent } from 'src/app/components/psychotherapy/tasks/task-dashboard-view/task-dashboard-view.component';

import { TemplateConfigurationFormViewComponent } from 'src/app/components/psychotherapy/tasks/template_configuration-form-view/template_configuration-form-view.component';
import { TaskTemplateShowViewComponent } from 'src/app/components/psychotherapy/tasks/task_template-show-view/task_template-show-view.component';

import { PatientFormViewModule } from 'src/app/components/clinical_note/patient-form-view/patient-form-view.module'
import { ReasonConsultationFormViewModule } from 'src/app/components/clinical_note/reason_consultation-form-view/reason_consultation-form-view.module';
import { EmotionsFormViewModule } from 'src/app/components/clinical_note/emotions-form-view/emotions-form-view.module';
import { BehaviorFormViewModule } from 'src/app/components/clinical_note/behavior-form-view/behavior-form-view.module';
import { NonVerbalLanguageFormViewModule } from 'src/app/components/clinical_note/nonverbal_language-form-view/nonverbal_language-form-view.module';
import { HobbiesInterestsFormViewModule } from 'src/app/components/clinical_note/hobbies_interests-form-view/hobbies_interests-form-view.module';
import { SchoolAreaFormViewModule } from 'src/app/components/clinical_note/school_area-form-view/school_area-form-view.module';
import { FamilyAreaFormViewModule } from 'src/app/components/clinical_note/family_area-form-view/family_area-form-view.module';
import { SocialAreaFormViewModule } from 'src/app/components/clinical_note/social_area-form-view/social_area-form-view.module';
import { PersonalCharacteristicsFormViewModule } from 'src/app/components/clinical_note/personal_characteristics-form-view/personal_characteristics-form-view.module';
import { TherapyObjectivesFormViewModule } from 'src/app/components/clinical_note/therapy_objectives-form-view/therapy_objectives-form-view.module';
import { ApproachFormViewModule } from 'src/app/components/clinical_note/approach-form-view/approach-form-view.module';
import { FunctionalityAnalysisFormModalModule } from 'src/app/components/clinical_note/functionality_analysis/functionality_analysis-form-modal/functionality_analysis-form-modal.module'; 
import { FunctionalityAnalysisFormViewModule } from 'src/app/components/clinical_note/functionality_analysis/functionality_analysis-form-view/functionality_analysis-form-view.module';
import { FunctionalityAnalysisListViewModule } from 'src/app/components/clinical_note/functionality_analysis/functionality_analysis-list-view/functionality_analysis-list-view.module'; 

import { SupportNetworkListViewModule } from 'src/app/components/clinical_note/support_network/support_network-list-view/support_network-list-view.module';

import { SupportNetworkFormModalModule } from 'src/app/components/clinical_note/support_network/support_network-form-modal/support_network-form-modal.module';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 1
};

@NgModule({
  declarations: [
    PsychotherapyComponent,
    PatientListViewComponent,
    PatientFormComponent,
    PatientCardViewComponent,
    PatientShowViewComponent,
    Clinical_NoteListViewComponent,
    ClinicalNoteFormComponent,
    ClinicalNoteShowFormViewComponent,
    TrackingFormViewComponent,
    TrackingListViewComponent,
    TrackingShowFormViewComponent,
    TrackingUpdateFormViewComponent,
    TaskDashboardViewComponent,
    TemplateConfigurationFormViewComponent,
    TaskTemplateShowViewComponent
  ],
  imports: [
    CommonModule,
    PsychotherapyRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    InputFileModule.forRoot(config),
    NgSelectModule,
    NgbModule,
    AngularEditorModule,

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
    PatientFormViewModule,
    FunctionalityAnalysisFormViewModule,
    FunctionalityAnalysisListViewModule,
    FunctionalityAnalysisFormModalModule,
    SupportNetworkListViewModule,
    SupportNetworkFormModalModule
  ],
  providers: []
})
export class PsychotherapyModule { }
