import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import {RouterModule} from '@angular/router';

import { MaterialAllModule } from 'src/material.module'
import { AdvanceSearchComponent } from './advance_search.component';


@NgModule({

  declarations: [
    AdvanceSearchComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ColorCircleModule,
    RouterModule,
    MaterialAllModule
  ],

  exports: [
    AdvanceSearchComponent
  ]
})

export class AdvanceSearchModule { }