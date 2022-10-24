import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSliderModule } from '@angular/material/slider'

import { TaskAssignedApplicationViewComponent } from './task_assigned-application-view.component';

@NgModule({

  declarations: [
    TaskAssignedApplicationViewComponent,
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
    TaskAssignedApplicationViewComponent
  ]
})

export class TaskAssignedApplicationViewModule { }