import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSliderModule } from '@angular/material/slider';

import { TaskAssignedListViewComponent } from './task_assigned-list-view.component';

@NgModule({

  declarations: [
    TaskAssignedListViewComponent,
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
    TaskAssignedListViewComponent
  ]
})

export class TaskAssignedListViewModule { }