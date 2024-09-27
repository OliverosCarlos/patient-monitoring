import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';


import { EarlyStimulationFormViewComponent } from './early_stimulation-form-view.component';

@NgModule({

  declarations: [
    EarlyStimulationFormViewComponent,
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
    EarlyStimulationFormViewComponent
  ]
})

export class EarlyStimulationFormViewModule { }