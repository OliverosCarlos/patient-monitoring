import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { PsychologistFormViewComponent } from './psychologist-form-view.component';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 1
};

@NgModule({

  declarations: [
    PsychologistFormViewComponent,
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
  ],

  exports: [
    PsychologistFormViewComponent
  ]
})

export class PsychologistFormViewModule { }