import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module'
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { PatientListViewComponent } from './patient-list-view.component';
import { AdvanceSearchModule } from 'src/app/utils/components/advance_search/advance_search.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({

  declarations: [
    PatientListViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialAllModule,
    NgxSpinnerModule,
    AdvanceSearchModule
  ],

  exports: [
    PatientListViewComponent
  ]
})

export class PatientListViewModule { }