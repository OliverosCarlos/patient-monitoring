import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { GenericModalComponent } from './generic-modal.component';

import { TaskTemplateListViewModule } from 'src/app/components/psychotherapy/tasks/task_template-list-view/task_template-list-view.module';
@NgModule({

  declarations: [
    GenericModalComponent,
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
    TaskTemplateListViewModule
  ],

  exports: [
    GenericModalComponent
  ]
})

export class GenericModalModule { }