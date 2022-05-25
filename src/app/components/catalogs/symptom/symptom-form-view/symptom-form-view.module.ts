import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';

import { SymptomFormViewComponent } from './symptom-form-view.component';

@NgModule({

  declarations: [
    SymptomFormViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ColorCircleModule
  ],

  exports: [
    SymptomFormViewComponent
  ]
})

export class SymptomFormViewModule { }