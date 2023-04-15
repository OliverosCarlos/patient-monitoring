import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSliderModule } from '@angular/material/slider'

import { TaskAssignedApplicationShowViewComponent } from './task_assigned_application-show-view.component';

@NgModule({

  declarations: [
    TaskAssignedApplicationShowViewComponent,
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
    TaskAssignedApplicationShowViewComponent
  ]
})

export class TaskAssignedApplicationViewModule { }