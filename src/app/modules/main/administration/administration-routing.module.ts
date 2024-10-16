import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration.component';
import { PsychologistFormViewComponent } from 'src/app/components/administration/psychologist/psychologist-form-view/psychologist-form-view.component';
import { PsychologistListViewComponent } from 'src/app/components/administration/psychologist/psychologist-list-view/psychologist-list-view.component';
import { PsychologistCardViewComponent } from 'src/app/components/administration/psychologist/psychologist-card-view/psychologist-card-view.component';
import { PsychologistShowViewComponent } from 'src/app/components/administration/psychologist/psychologist-show-view/psychologist-show-view.component';

import { BayleyItemFormViewComponent } from 'src/app/components/administration/tests/bayley/bayley_item-form-view/bayley_item-form-view.component'
import { BayleyItemListViewComponent } from 'src/app/components/administration/tests/bayley/bayley_item-list-view/bayley_item-list-view.component'

const routes: Routes = [
  { path: '', component: AdministrationComponent, data: { breadcrumb: 'Dashboard' },
    children : [
      { path: 'psychologist/form', component: PsychologistFormViewComponent, data: { breadcrumb: 'Nuevo' }  },
      { path: 'psychologist/table', component: PsychologistListViewComponent, data: { breadcrumb: 'Listado' }  },
      { path: 'psychologist/card', component: PsychologistCardViewComponent, data: { breadcrumb: 'Listado' }  },
      { path: 'psychologist/form/:psychologist_id', component: PsychologistShowViewComponent, data: { breadcrumb: 'Nuevo' }  },
      { path: 'bayley-item/form', component: BayleyItemFormViewComponent, data: { breadcrumb: 'item' }  },
      { path: 'bayley-item/table', component: BayleyItemListViewComponent, data: { breadcrumb: 'item' }  },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
