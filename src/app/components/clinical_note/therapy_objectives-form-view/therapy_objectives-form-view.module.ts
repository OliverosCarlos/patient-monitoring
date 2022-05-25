import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TherapyObjectivesFormViewComponent } from './therapy_objectives-form-view.component';

import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({

  declarations: [
    TherapyObjectivesFormViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AngularEditorModule
  ],

  exports: [
    TherapyObjectivesFormViewComponent
  ]
})

export class TherapyObjectivesFormViewModule { }