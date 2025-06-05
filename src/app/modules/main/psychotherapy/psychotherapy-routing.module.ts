import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PsychotherapyComponent } from './psychotherapy.component';

import { PatientListViewComponent } from 'src/app/components/psychotherapy/patient/patient-list-view/patient-list-view.component';
import { PatientCardViewComponent } from 'src/app/components/psychotherapy/patient/patient-card-view/patient-card-view.component';
import { PatientFormComponent } from 'src/app/components/psychotherapy/patient/patient-form/patient-form.component';
import { PatientShowViewComponent } from 'src/app/components/psychotherapy/patient/patient-show-view/patient-show-view.component';

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
