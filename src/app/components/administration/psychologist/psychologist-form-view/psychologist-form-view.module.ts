import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilePickerModule } from  '@sleiss/ngx-awesome-uploader';

import { PsychologistFormViewComponent } from './psychologist-form-view.component';


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
    FilePickerModule
  ],

  exports: [
    PsychologistFormViewComponent
  ]
})

export class PsychologistFormViewModule { }