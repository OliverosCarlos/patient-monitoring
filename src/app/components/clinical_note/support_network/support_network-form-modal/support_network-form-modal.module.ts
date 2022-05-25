import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { SupportNetworkFormModalComponent } from './support_network-form-modal.component';

@NgModule({

  declarations: [
    SupportNetworkFormModalComponent,
  ],

  entryComponents: [
  ],

  providers: [
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatRadioModule
  ],

  exports: [
    SupportNetworkFormModalComponent
  ]
})

export class SupportNetworkFormModalModule { }