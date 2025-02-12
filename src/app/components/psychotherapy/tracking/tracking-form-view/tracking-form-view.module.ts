//File generated by vaweei CLI
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';

import { NgSelectModule } from '@ng-select/ng-select';

import { TrackingFormViewComponent } from './tracking-form-view.component';

@NgModule({

  declarations: [
    TrackingFormViewComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    CommonModule
  ],

  exports: [
    TrackingFormViewComponent
  ]
})

export class TrackingFormViewModule { }        
        