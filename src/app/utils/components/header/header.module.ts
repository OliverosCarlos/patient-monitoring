import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import {RouterModule} from '@angular/router';

import { HeaderComponent } from './header.component';

import { MaterialAllModule } from 'src/material.module'

@NgModule({

  declarations: [
    HeaderComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialAllModule,
    ColorCircleModule,
    RouterModule
  ],

  exports: [
    HeaderComponent
  ]
})

export class HeaderModule { }