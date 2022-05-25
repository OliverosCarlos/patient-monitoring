import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TemplateConfigurationFormViewComponent } from './template_configuration-form-view.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({

  declarations: [
    TemplateConfigurationFormViewComponent,
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
    TemplateConfigurationFormViewComponent
  ]
})

export class TemplateConfigurationFormViewModule { }