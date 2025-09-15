import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import { MaterialAllModule } from 'src/material.module'

import { ClinicalHistoryShowViewComponent } from './clinical_history-show-view.component';

@NgModule({

  declarations: [
    ClinicalHistoryShowViewComponent
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ColorCircleModule,
    MaterialAllModule
  ],

  exports: [
    ClinicalHistoryShowViewComponent
  ]
})

export class ClinicalHistoryShowViewModule { }