import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ApproachFormViewComponent } from './approach-form-view.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

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
    AngularEditorModule
  ],

  exports: [
    ApproachFormViewComponent
  ]
})

export class ApproachFormViewModule { }