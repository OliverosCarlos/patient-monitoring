import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EarlyStimulationShowViewComponent } from './early_stimulation-show-view.component';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({

  declarations: [
    EarlyStimulationShowViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],

  exports: [
    EarlyStimulationShowViewComponent
  ]
})

export class EarlyStimulationShowViewModule { }