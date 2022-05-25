import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { PatientFormViewComponent } from './patient-form-view.component';

@NgModule({

  declarations: [
    PatientFormViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgSelectModule
  ],

  exports: [
    PatientFormViewComponent
  ]
})

export class PatientFormViewModule { }