import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module'
import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { TaskTemplateShowViewComponent } from './task_template-show-view.component';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 1
};

@NgModule({

  declarations: [
    TaskTemplateShowViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputFileModule.forRoot(config),
    MaterialAllModule
  ],

  exports: [
    TaskTemplateShowViewComponent
  ]
})

export class TaskTemplateShowViewModule { }