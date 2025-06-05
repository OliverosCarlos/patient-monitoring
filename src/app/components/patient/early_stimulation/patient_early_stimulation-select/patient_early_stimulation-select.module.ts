import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialAllModule } from 'src/material.module'
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { PatientEarlyStimulationSelectComponent } from './patient_early_stimulation-select.component';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({

  declarations: [
    PatientEarlyStimulationSelectComponent,
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
    NgSelectModule
  ],

  exports: [
    PatientEarlyStimulationSelectComponent
  ]
})

export class PatientEarlyStimulationSelectModule { }