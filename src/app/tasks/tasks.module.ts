import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';

import { MaterialAllModule } from 'src/material.module';

@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialAllModule
  ]
})
export class TasksModule { }
