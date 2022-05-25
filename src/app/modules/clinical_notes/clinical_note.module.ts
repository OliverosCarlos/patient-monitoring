import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module'
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ClinicalNoteRoutingModule } from './clinical_note-routing.module';

import { ClinicalNoteComponent } from './clinical_note.component';
// import { ClinicalNoteFormComponent } from 'src/app/components/clinical_note/clinical-note-form/clinical-note-form.component';


import { PruebaFormViewModule } from 'src/app/components/catalogs/prueba/prueba-form-view/prueba-form-view.module';
@NgModule({
  declarations: [
    ClinicalNoteComponent,
    // ClinicalNoteFormComponent
  ],
  imports: [
    CommonModule,
    ClinicalNoteRoutingModule,
    MaterialAllModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [  ]
})
export class ClinicalNoteModule { }
