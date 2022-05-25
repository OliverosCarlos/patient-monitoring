import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BehaviorFormViewComponent } from './behavior-form-view.component';

@NgModule({

  declarations: [
    BehaviorFormViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],

  exports: [
    BehaviorFormViewComponent
  ]
})

export class BehaviorFormViewModule { }