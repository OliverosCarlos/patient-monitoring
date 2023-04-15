import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSliderModule } from '@angular/material/slider'

import { TaskAssignedApplicationFormViewComponent } from './task_assigned_application-form-view.component';

@NgModule({

  declarations: [
    TaskAssignedApplicationFormViewComponent,
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
    RouterModule,
    MatSliderModule
  ],

  exports: [
    TaskAssignedApplicationFormViewComponent
  ]
})

export class TaskAssignedApplicationViewModule { }