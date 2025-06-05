import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ApproachFormViewComponent } from './approach-form-view.component';

@NgModule({

  declarations: [
    ApproachFormViewComponent,
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
    ApproachFormViewComponent
  ]
})

export class ApproachFormViewModule { }