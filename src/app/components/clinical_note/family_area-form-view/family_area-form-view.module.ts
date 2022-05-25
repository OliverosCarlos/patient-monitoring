import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FamilyAreaFormViewComponent } from './family_area-form-view.component';

@NgModule({

  declarations: [
    FamilyAreaFormViewComponent,
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
    FamilyAreaFormViewComponent
  ]
})

export class FamilyAreaFormViewModule { }