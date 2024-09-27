import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
const routes: Routes = [
  { path: '', component: MainComponent, data: { breadcrumb: 'Home' }, 
    children: [
      {
        path: 'evaluations',
        loadChildren: () => import('./evaluations/evaluations.module').then(m => m.EvaluationsModule),
      },
      {
        path: 'clinical-history',
        loadChildren: () => import('./clinical_history/clinical_history.module').then(m => m.ClinicalHistoryModule),
      },
      {
        path: 'tasks', 
        loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
        data: { breadcrumb: 'Tareas' } 
      }, 
      { 
        path: 'patients', 
        loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule),
        data: { breadcrumb: 'Pacientes',  animation: 'HomePage' }  
      },
      { 
        path: 'psychotherapy',
        loadChildren: () => import('./psychotherapy/psychotherapy.module').then(m => m.PsychotherapyModule),
        data: { breadcrumb: 'psicoterapia', animation: 'AboutPage' }  
      },
      { 
        path: 'clinical-notes',
        loadChildren: () => import('./clinical_notes/clinical_note.module').then(m => m.ClinicalNoteModule),
        data: { breadcrumb: 'psicoterapia' }  
      },
      { 
        path: 'administration',
        loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule),
        data: { breadcrumb: 'administración' }  
      },
      { 
        path: 'catalogs',
        loadChildren: () => import('./catalogs/catalogs.module').then(m => m.CatalogsModule),
        data: { breadcrumb: 'Catálogos' }  
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
