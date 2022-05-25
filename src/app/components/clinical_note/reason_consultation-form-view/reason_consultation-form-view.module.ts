import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ReasonConsultationFormViewComponent } from './reason_consultation-form-view.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({

  declarations: [
    ReasonConsultationFormViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgSelectModule,
    AngularEditorModule
  ],

  exports: [
    ReasonConsultationFormViewComponent
  ]
})

export class ReasonConsultationFormViewModule { }