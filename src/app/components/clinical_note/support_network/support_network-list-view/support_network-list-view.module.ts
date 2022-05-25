//File generated by vaweei CLI
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module' //we need more accurate imports from this library
import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { SupportNetworkListViewComponent } from './support_network-list-view.component';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 1
};

@NgModule({

  declarations: [
    SupportNetworkListViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputFileModule.forRoot(config),
    MaterialAllModule
  ],

  exports: [
    SupportNetworkListViewComponent
  ]
})

export class SupportNetworkListViewModule {}       
        