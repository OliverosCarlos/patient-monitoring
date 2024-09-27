//File generated by vaweei CLI
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module'
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { TrackingShowFormViewComponent } from './tracking-show-form-view.component';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({

  declarations: [
    TrackingShowFormViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    //InputFileModule.forRoot(config),
    MaterialAllModule
  ],

  exports: [
    TrackingShowFormViewComponent
  ]
})

export class TrackingShowFormViewModule { }       
        