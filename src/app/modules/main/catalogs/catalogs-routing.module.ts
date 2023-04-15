import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogsComponent } from './catalogs.component';

import { EmotionListViewComponent } from 'src/app/components/catalogs/emotions/emotion-list-view/emotion-list-view.component';
import { EmotionFormViewComponent } from 'src/app/components/catalogs/emotions/emotion-form-view/emotion-form-view.component';
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

const routes: Routes = [
  { path: 'emotions', data: { breadcrumb: 'Emociones' },
    children:[
      { path: '', component: EmotionListViewComponent, data: { breadcrumb: 'Lista' }, canActivate: [CanActivateLogged] },
      { path: 'form', component: EmotionFormViewComponent, data: { breadcrumb: 'Creación' }, canActivate: [CanActivateLogged]},
      { path: 'form/:emotion_id', component: EmotionShowViewComponent, data: { breadcrumb: "Visualizar" } },
      { path: 'update/:emotion_id', component: EmotionUpdateViewComponent, data: { breadcrumb: 'Actualizar' }  }
    ],
  },
  { path: 'symptom', data: { breadcrumb: 'Síntomas' },
    children: [
      { path: '', component: SymptomListViewComponent, data: { breadcrumb: 'Lista' }  },
      { path: 'form', component: SymptomFormViewComponent, data: { breadcrumb: 'Creación' }  },
      { path: 'form/:symptom_id', component: SymptomShowViewComponent, data: { breadcrumb: 'Visualizar' }  },
      { path: 'update/:symptom_id', component: SymptomUpdateViewComponent, data: { breadcrumb: 'Actualizar' }  }
    ]
  },
  { path: 'hobbies-interest', data: { breadcrumb: 'Hobbies e Intereses' },
    children: [
      { path: '', component: Hobbies_InterestListViewComponent, data: { breadcrumb: 'Lista' }  },
      { path: 'form', component: Hobbies_InterestFormViewComponent, data: { breadcrumb: 'Creación' }  },
      { path: 'form/:hobbies-interest_id', component: Hobbies_InterestShowFormViewComponent, data: { breadcrumb: 'Visualizar' }  },
      { path: 'update/:hobbies-interest_id', component: Hobbies_InterestUpdateFormViewComponent, data: { breadcrumb: 'Actualizar' }  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
