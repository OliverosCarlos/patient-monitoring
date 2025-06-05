import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialAllModule } from 'src/material.module'
import { AdvanceSearchModule } from 'src/app/utils/components/advance_search/advance_search.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { PsychotherapyRoutingModule } from './psychotherapy-routing.module';
import { PsychotherapyComponent } from './psychotherapy.component';

import { PatientListViewComponent } from 'src/app/components/psychotherapy/patient/patient-list-view/patient-list-view.component';
import { PatientCardViewComponent } from 'src/app/components/psychotherapy/patient/patient-card-view/patient-card-view.component';
import { PatientFormComponent } from 'src/app/components/psychotherapy/patient/patient-form/patient-form.component';
import { PatientShowViewComponent } from 'src/app/components/psychotherapy/patient/patient-show-view/patient-show-view.component';
import { PatientCardItemModule } from 'src/app/components/psychotherapy/patient/patient-card-item/patient-card-item.module';

import { TaskDashboardViewComponent } from 'src/app/components/psychotherapy/tasks/task-dashboard-view/task-dashboard-view.component';
import { TaskAssignedListViewComponent } from 'src/app/components/psychotherapy/tasks/task_assigned-list-view/task_assigned-list-view.component';
import { TemplateConfigurationFormViewComponent } from 'src/app/components/psychotherapy/tasks/template_configuration-form-view/template_configuration-form-view.component';
import { TaskTemplateShowViewComponent } from 'src/app/components/psychotherapy/tasks/task_template-show-view/task_template-show-view.component';
// import { TaskTemplateListViewModule } from 'src/app/components/psychotherapy/tasks/task_template-list-view/task_template-list-view.module';
import { GenericModalModule } from 'src/app/utils/components/generic-modal/generic-modal.module';
import { TaskAssignmentFormViewComponent } from 'src/app/components/psychotherapy/tasks/task_assignment-form-view/task_assignment-form-view.component';
import { TaskAssignedApplicationFormViewComponent } from 'src/app/components/psychotherapy/tasks/task_assigned-application/task_assigned_application-form-view/task_assigned_application-form-view.component';
import { TaskAssignedApplicationShowViewComponent } from 'src/app/components/psychotherapy/tasks/task_assigned-application/task_assigned_application-show-view/task_assigned_application-show-view.component';

import { PatientAssignedListViewModule } from 'src/app/components/psychotherapy/tasks/task-dashboard-view/patient_assigned-list-view/patient_assigned-list-view.module';
import { PatientsToAssignListViewModule } from 'src/app/components/psychotherapy/tasks/task-dashboard-view/patients_to_assign-list-view/patients_to_assign-list-view.module';
import { TaskTemplateListViewModule } from 'src/app/components/psychotherapy/tasks/task-dashboard-view/task_template-list-view/task_template-list-view.module';
import { AssignTaskModalViewModule } from 'src/app/components/psychotherapy/tasks/task-dashboard-view/assign_task-modal-view/assign_task-modal-view.module';

import { GenericSnackbarComponent } from 'src/app/utils/components/generic_snackbar/generic_snackbar.component';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({
  declarations: [
    PsychotherapyComponent,
    PatientListViewComponent,
    PatientFormComponent,
    PatientCardViewComponent,
    TaskDashboardViewComponent,
    TemplateConfigurationFormViewComponent,
    TaskTemplateShowViewComponent,
    TaskAssignmentFormViewComponent,
    TaskAssignedListViewComponent,
    TaskAssignedApplicationFormViewComponent,
    TaskAssignedApplicationShowViewComponent,
    GenericSnackbarComponent,
  ],
  imports: [
    CommonModule,
    PsychotherapyRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AdvanceSearchModule,
    NgSelectModule,
    NgbModule,
    AngularEditorModule,

    PatientAssignedListViewModule,
    PatientsToAssignListViewModule,
    TaskTemplateListViewModule,
    AssignTaskModalViewModule,
    
    GenericModalModule,
    PatientCardItemModule
  ],
  providers: []
})
export class PsychotherapyModule { }
