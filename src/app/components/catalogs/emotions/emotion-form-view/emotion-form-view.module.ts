import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';

import { EmotionFormViewComponent } from './emotion-form-view.component';

@NgModule({

  declarations: [
    EmotionFormViewComponent,
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
    EmotionFormViewComponent
  ]
})

export class BehaviorFormViewModule { }