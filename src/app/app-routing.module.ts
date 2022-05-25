import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'tasks', 
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
    data: { breadcrumb: 'Tareas' } 
  }, 
  { 
    path: 'patients', 
    loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule),
    data: { breadcrumb: 'Pacientes' }  
  },
  { 
    path: 'psychotherapy',
    loadChildren: () => import('./modules/psychotherapy/psychotherapy.module').then(m => m.PsychotherapyModule),
    data: { breadcrumb: 'psicoterapia' }  
  },
  { 
    path: 'clinical-notes',
    loadChildren: () => import('./modules/clinical_notes/clinical_note.module').then(m => m.ClinicalNoteModule),
    data: { breadcrumb: 'psicoterapia' }  
  },
  { 
    path: 'administration',
    loadChildren: () => import('./modules/administration/administration.module').then(m => m.AdministrationModule),
    data: { breadcrumb: 'administración' }  
  },
  { 
    path: 'catalogs',
    loadChildren: () => import('./modules/catalogs/catalogs.module').then(m => m.CatalogsModule),
    data: { breadcrumb: 'catálogos' }  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }