import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module'
import { FilePickerModule } from  '@sleiss/ngx-awesome-uploader';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { safehtmlModule } from 'src/app/utils/components/custom_pipes/safehtml.module'


import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';

import { PsychologistFormViewComponent } from 'src/app/components/administration/psychologist/psychologist-form-view/psychologist-form-view.component';
import { PsychologistCardViewComponent } from 'src/app/components/administration/psychologist/psychologist-card-view/psychologist-card-view.component';
import { PsychologistListViewComponent } from 'src/app/components/administration/psychologist/psychologist-list-view/psychologist-list-view.component';
import { PsychologistShowViewComponent } from 'src/app/components/administration/psychologist/psychologist-show-view/psychologist-show-view.component';

import { BayleyItemFormViewComponent } from 'src/app/components/administration/tests/bayley/bayley_item-form-view/bayley_item-form-view.component';
import { BayleyItemListViewComponent } from 'src/app/components/administration/tests/bayley/bayley_item-list-view/bayley_item-list-view.component';

//const config: InputFileConfig = {
//  fileAccept: '*',k
//  fileLimit: 1
//};

@NgModule({
  declarations: [
    AdministrationComponent,
    PsychologistFormViewComponent,
    PsychologistCardViewComponent,
    PsychologistListViewComponent,
    PsychologistShowViewComponent,
    BayleyItemFormViewComponent,
    BayleyItemListViewComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    FilePickerModule,
    NgSelectModule,
    CKEditorModule,
    safehtmlModule
  ],
  providers: []
})
export class AdministrationModule { }
