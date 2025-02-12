import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsychotherapyComponent } from './psychotherapy.component';

import { PatientListViewComponent } from 'src/app/components/psychotherapy/patient/patient-list-view/patient-list-view.component';
import { PatientCardViewComponent } from 'src/app/components/psychotherapy/patient/patient-card-view/patient-card-view.component';
import { PatientFormComponent } from 'src/app/components/psychotherapy/patient/patient-form/patient-form.component';
import { PatientShowViewComponent } from 'src/app/components/psychotherapy/patient/patient-show-view/patient-show-view.component';

import { ClinicalNoteFormComponent } from 'src/app/components/clinical_note/clinical-note-form/clinical-note-form.component';
import { Clinical_NoteListViewComponent } from 'src/app/components/clinical_note/clinical-note-list-view/clinical-note-list-view.component';
import { ClinicalNoteShowFormViewComponent } from 'src/app/components/clinical_note/clinical_note-show-view/clinical_note-show-form-view.component';

import { TrackingFormViewComponent } from 'src/app/components/psychotherapy/tracking/tracking-form-view/tracking-form-view.component';
import { TrackingListViewComponent } from 'src/app/components/psychotherapy/tracking/tracking-list-view/tracking-list-view.component';
import { TrackingShowFormViewComponent } from 'src/app/components/psychotherapy/tracking/tracking-show-form-view/tracking-show-form-view.component';
import { TrackingUpdateFormViewComponent } from 'src/app/components/psychotherapy/tracking/tracking-update-form-view/tracking-update-form-view.component';
import { TrackingFormDashboardViewComponent } from 'src/app/components/psychotherapy/tracking/tracking-form-dashboard-view/tracking-form-dashboard-view.component';

import { TaskDashboardViewComponent } from 'src/app/components/psychotherapy/tasks/task-dashboard-view/task-dashboard-view.component';
import { TemplateConfigurationFormViewComponent } from 'src/app/components/psychotherapy/tasks/template_configuration-form-view/template_configuration-form-view.component';
import { TaskTemplateShowViewComponent } from 'src/app/components/psychotherapy/tasks/task_template-show-view/task_template-show-view.component';
import { TaskAssignmentFormViewComponent } from 'src/app/components/psychotherapy/tasks/task_assignment-form-view/task_assignment-form-view.component';
import { TaskAssignedApplicationFormViewComponent } from 'src/app/components/psychotherapy/tasks/task_assigned-application/task_assigned_application-form-view/task_assigned_application-form-view.component';
import { TaskAssignedApplicationShowViewComponent } from 'src/app/components/psychotherapy/tasks/task_assigned-application/task_assigned_application-show-view/task_assigned_application-show-view.component';
import { TaskAssignedListViewComponent } from 'src/app/components/psychotherapy/tasks/task_assigned-list-view/task_assigned-list-view.component';

const routes: Routes = [
  { path: '', component: PsychotherapyComponent, data: { breadcrumb: 'Dashboard' }  },

  { path: 'patients', component: PatientListViewComponent, data: { breadcrumb: 'Pacientes' }  },
  { path: 'patients/table', component: PatientListViewComponent, data: { breadcrumb: 'Pacientes' }  },
  { path: 'patients/card', component: PatientCardViewComponent, data: { breadcrumb: 'Pacientes' }  },
  { path: 'patients/form', component: PatientFormComponent, data: { breadcrumb: 'Nuevo' }  },
  { path: 'patients/form/:patient_id', component: PatientShowViewComponent, data: { breadcrumb: 'Nuevo' }  },

  { path: 'clinical-notes/table', component: Clinical_NoteListViewComponent, data: { breadcrumb: 'Notas' }  },
  { path: 'clinical-notes/form', component: ClinicalNoteFormComponent, data: { breadcrumb: 'Nuevo' }  },
  { path: 'clinical-notes/form/:patient_id', component: ClinicalNoteShowFormViewComponent, data: { breadcrumb: 'Nuevo' }  },

  { path: 'tracking/table', component:  TrackingListViewComponent, data: { breadcrumb: 'Seguimiento' }  },
  { path: 'tracking/table/by_patient/:patient_id', component:  TrackingListViewComponent, data: { breadcrumb: 'Seguimiento' }  },
  { path: 'tracking/form', component: TrackingFormViewComponent , data: { breadcrumb: 'Nuevo' }  },
  { path: 'tracking/form/:tracking_id', component: TrackingShowFormViewComponent, data: { breadcrumb: 'Nuevo' }  },
  { path: 'tracking/update/:tracking_id', component: TrackingUpdateFormViewComponent, data: { breadcrumb: 'Seguimiento' }  },
  { path: 'tracking/form/dashboard/:patient_id', component: TrackingFormDashboardViewComponent, data: { breadcrumb: 'Nota Clinica' }  },

  { path: 'task/dashboard', component: TaskDashboardViewComponent, data: { breadcrumb: 'Tareas' }, title: 'Tareas - Dashboard' },
  { path: 'template-configuration/form', component: TemplateConfigurationFormViewComponent, data: { breadcrumb: 'Plantilla' }  },
  { path: 'template-configuration/form/:task_template_id', component: TaskTemplateShowViewComponent, data: { breadcrumb: 'Vista' }  },
  { path: 'task-assignment/form', component: TaskAssignmentFormViewComponent, data: { breadcrumb: 'Vista' }  },
  { path: 'task/application/form/:patient_task_id/task_template/:task_template_id', component: TaskAssignedApplicationFormViewComponent, data: { breadcrumb: 'Aplicación' }, title: 'Tarea - Aplicación'},
  { path: 'task/application/show/:patient_task_id', component: TaskAssignedApplicationShowViewComponent, data: { breadcrumb: 'Aplicación' }, title: 'Tarea - Revisión'},

  { path: 'task-assigned/table', component: TaskAssignedListViewComponent, data: { breadcrumb: 'Tareas' }  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychotherapyRoutingModule { }
