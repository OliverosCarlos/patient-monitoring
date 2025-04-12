import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialAllModule } from 'src/material.module'
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { ColorCircleModule } from 'ngx-color/circle';

import { TimeFormatPipe } from 'src/app/utils/components/custom_pipes/time-format.pipe';
import { MainViewerModule } from 'src/app/utils/components/main_viewer/main_viewer.module'

import { WeekDayTranslatePipe } from 'src/app/utils/components/custom_pipes/week-day-translate.pipe';
import { PatientFormViewModule } from 'src/app/components/psychotherapy/patient/patient-select/patient-select.module';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';

import { SchedulerDashboardViewComponent } from 'src/app/components/scheduler/scheduler-dashboard/scheduler-dashboard-view.component';
import { AppointmentFormViewComponent } from 'src/app/components/scheduler/appointment-form-view/appointment-form-view.component';

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';


@NgModule({
  declarations: [
    SchedulerComponent,
    SchedulerDashboardViewComponent,
    AppointmentFormViewComponent,
    TimeFormatPipe,
    WeekDayTranslatePipe
  ],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ColorCircleModule,
    PatientFormViewModule,
    NgSelectModule,
    MainViewerModule
  ],
  providers: [
    CanActivateLogged
  ]
})
export class SchedulerModule { }
