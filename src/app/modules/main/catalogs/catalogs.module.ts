import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialAllModule } from 'src/material.module'
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { ColorCircleModule } from 'ngx-color/circle';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CatalogsComponent } from './catalogs.component';

import { EmotionFormViewComponent } from 'src/app/components/catalogs/emotions/emotion-form-view/emotion-form-view.component';
import { EmotionListViewComponent } from 'src/app/components/catalogs/emotions/emotion-list-view/emotion-list-view.component';
import { EmotionShowViewComponent } from 'src/app/components/catalogs/emotions/emotion-show-view/emotion-show-view.component';
import { EmotionUpdateViewComponent } from 'src/app/components/catalogs/emotions/emotion-update-view/emotion-update-view.component';

import { SymptomListViewComponent } from 'src/app/components/catalogs/symptom/symptom-list-view/symptom-list-view.component';
import { SymptomFormViewComponent } from 'src/app/components/catalogs/symptom/symptom-form-view/symptom-form-view.component';
import { SymptomShowViewComponent } from 'src/app/components/catalogs/symptom/symptom-show-view/symptom-show-view.component';
import { SymptomUpdateViewComponent } from 'src/app/components/catalogs/symptom/symptom-update-view/symptom-update-view.component';

import { Hobbies_InterestFormViewComponent } from 'src/app/components/catalogs/hobbies_interest/hobbies_interest-form-view/hobbies_interest-form-view.component';
import { Hobbies_InterestListViewComponent } from 'src/app/components/catalogs/hobbies_interest/hobbies_interest-list-view/hobbies_interest-list-view.component';
import { Hobbies_InterestShowFormViewComponent } from 'src/app/components/catalogs/hobbies_interest/hobbies_interest-show-form-view/hobbies_interest-show-form-view.component';
import { Hobbies_InterestUpdateFormViewComponent } from 'src/app/components/catalogs/hobbies_interest/hobbies_interest-update-form-view/hobbies_interest-update-form-view.component';

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({
  declarations: [
    CatalogsComponent,
    EmotionFormViewComponent,
    EmotionListViewComponent,
    EmotionShowViewComponent,
    EmotionUpdateViewComponent,
    SymptomListViewComponent,
    SymptomFormViewComponent,
    SymptomShowViewComponent,
    SymptomUpdateViewComponent,
    Hobbies_InterestFormViewComponent,
    Hobbies_InterestListViewComponent,
    Hobbies_InterestShowFormViewComponent,
    Hobbies_InterestUpdateFormViewComponent
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    //InputFileModule.forRoot(config),
    ColorCircleModule,
  ],
  providers: [
    CanActivateLogged
  ]
})
export class CatalogsModule { }
