import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmotionUpdateViewComponent } from './emotion-update-view.component';

@NgModule({

  declarations: [
    EmotionUpdateViewComponent,
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
    EmotionUpdateViewComponent
  ]
})

export class BehaviorFormViewModule { }