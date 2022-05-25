import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module'
import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';

import { PsychologistFormViewComponent } from 'src/app/components/administration/psychologist/psychologist-form-view/psychologist-form-view.component';
import { PsychologistCardViewComponent } from 'src/app/components/administration/psychologist/psychologist-card-view/psychologist-card-view.component';
import { PsychologistListViewComponent } from 'src/app/components/administration/psychologist/psychologist-list-view/psychologist-list-view.component';
import { PsychologistShowViewComponent } from 'src/app/components/administration/psychologist/psychologist-show-view/psychologist-show-view.component';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 1
};

@NgModule({
  declarations: [
    AdministrationComponent,
    PsychologistFormViewComponent,
    PsychologistCardViewComponent,
    PsychologistListViewComponent,
    PsychologistShowViewComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    InputFileModule.forRoot(config),
    // PsychologistListViewModule
  ],
  providers: []
})
export class AdministrationModule { }
