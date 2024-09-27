import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialAllModule } from 'src/material.module'
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { ColorCircleModule } from 'ngx-color/circle';

import { EvaluationsRoutingModule } from './evaluations-routing.module';
import { EvaluationsComponent } from './evaluations.component';

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';

import { EvaluationsDashboardViewComponent } from 'src/app/components/evaluations/evaluations-dashboard/evaluations-dashboard-view.component';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({
  declarations: [
    EvaluationsComponent,
    EvaluationsDashboardViewComponent
  ],
  imports: [
    CommonModule,
    EvaluationsRoutingModule,
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
export class EvaluationsModule { }
