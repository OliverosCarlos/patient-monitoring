import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module'
import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { SymptomListViewComponent } from './symptom-list-view.component';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 1
};

@NgModule({

  declarations: [
    SymptomListViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputFileModule.forRoot(config),
    MaterialAllModule
  ],

  exports: [
    // PsychologistListViewComponent
  ]
})

export class SymptomListViewModule { }