import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';

import { LoginComponent } from './login.component';

@NgModule({

  declarations: [
    LoginComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ColorCircleModule
  ],

  exports: [
    LoginComponent
  ]
})

export class BehaviorFormViewModule { }