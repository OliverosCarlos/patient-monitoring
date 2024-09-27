import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { EarlyStimulationReportFormViewComponent } from './early_stimulation_report-form-view.component';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({

  declarations: [
    EarlyStimulationReportFormViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AngularEditorModule,
    CKEditorModule
  ],

  exports: [
    EarlyStimulationReportFormViewComponent
  ]
})

export class EarlyStimulationReportFormViewModule { }