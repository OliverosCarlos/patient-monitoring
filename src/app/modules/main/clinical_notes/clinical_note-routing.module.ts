import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicalNoteComponent } from './clinical_note.component';
import { ClinicalNoteFormComponent } from 'src/app/components/clinical_note/clinical-note-form/clinical-note-form.component';

const routes: Routes = [
  { path: '', component: ClinicalNoteComponent, data: { breadcrumb: 'Dashboard' }  },
  { path: 'new', component: ClinicalNoteFormComponent, data: { breadcrumb: 'Nuevo' }  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicalNoteRoutingModule { }
