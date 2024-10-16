import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EvaluationsComponent } from './evaluations.component';

import { EvaluationsDashboardViewComponent } from 'src/app/components/evaluations/evaluations-dashboard/evaluations-dashboard-view.component';
import { BayleyItemListViewComponent } from 'src/app/components/evaluations/bayley/bayley_apply-tool-view/bayley_apply-tool-view.component'

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';

const routes: Routes = [
  { path: '', component: EvaluationsComponent, data: { breadcrumb: 'Evaluaciones' },
    children:[
      { path: '', component: EvaluationsDashboardViewComponent, data: { breadcrumb: 'Dashboard',  animation: true }, canActivate: [CanActivateLogged] },
      // { path: 'form', component: EmotionFormViewComponent, data: { breadcrumb: 'Creación',  animation: true }, canActivate: [CanActivateLogged]},
      // { path: 'form/:emotion_id', component: EmotionShowViewComponent, data: { breadcrumb: "Visualizar",  animation: true } },
      // { path: 'update/:emotion_id', component: EmotionUpdateViewComponent, data: { breadcrumb: 'Actualizar',  animation: true }  }
    ],
  },
  { path: 'bayley-apply', component: BayleyItemListViewComponent, data: { breadcrumb: 'bayley',  animation: true }, canActivate: [CanActivateLogged] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationsRoutingModule { }
