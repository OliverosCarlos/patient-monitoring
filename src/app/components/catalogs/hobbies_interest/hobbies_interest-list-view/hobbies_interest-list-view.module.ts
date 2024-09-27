//File generated by vaweei CLI
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module' //we need more accurate imports from this library
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { Hobbies_InterestListViewComponent } from './hobbies_interest-list-view.component';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({

  declarations: [
    Hobbies_InterestListViewComponent,
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
    // Hobbies_InterestListViewComponent
  ]
})

export class Hobbies_InterestListViewModule {}       
        