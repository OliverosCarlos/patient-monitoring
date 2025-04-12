import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchedulerComponent } from './scheduler.component';
import { SchedulerDashboardViewComponent } from 'src/app/components/scheduler/scheduler-dashboard/scheduler-dashboard-view.component';

import { AppointmentFormViewComponent } from 'src/app/components/scheduler/appointment-form-view/appointment-form-view.component';

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';

const routes: Routes = [
  { path: '', component: SchedulerComponent, data: { breadcrumb: 'Agenda' },
    children:[
      { path: '', component: SchedulerDashboardViewComponent, data: { breadcrumb: 'Dashboard' } },
      { path: 'dashboard', component: SchedulerDashboardViewComponent, data: { breadcrumb: 'Dashboard' } },
      { path: 'appointment', data: { breadcrumb: 'Citas' },
        children:[
      //     { path: 'list', component: EmotionListViewComponent, data: { breadcrumb: 'Lista',  animation: true }, canActivate: [CanActivateLogged] },
          { path: 'form', component: AppointmentFormViewComponent, data: { breadcrumb: 'Creación',  animation: true }, canActivate: [CanActivateLogged]},
      //     { path: 'form/:emotion_id', component: EmotionShowViewComponent, data: { breadcrumb: "Visualizar",  animation: true } },
      //     { path: 'update/:emotion_id', component: EmotionUpdateViewComponent, data: { breadcrumb: 'Actualizar',  animation: true }  }
        ]
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }
