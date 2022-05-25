import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SchoolAreaFormViewComponent } from './school_area-form-view.component';

@NgModule({

  declarations: [
    SchoolAreaFormViewComponent,
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
    SchoolAreaFormViewComponent
  ]
})

export class SchoolAreaFormViewModule { }