import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ClinicalHistoryEarlyStimulationShowViewComponent } from './clinical_history_early_stimulation-show-view.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import {CdkAccordionModule} from '@angular/cdk/accordion';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({

  declarations: [
    ClinicalHistoryEarlyStimulationShowViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTabsModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    CdkAccordionModule
],

  exports: [
    ClinicalHistoryEarlyStimulationShowViewComponent
  ]
})

export class ClinicalHistoryEarlyStimulationShowViewModule { }