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
  { path: '', component: CatalogsComponent, data: { breadcrumb: 'Catálogos' },
    children:[
      { path: 'emotions/table', component: EmotionListViewComponent, data: { breadcrumb: 'Emociones' }, canActivate: [CanActivateLogged] },
      { path: 'emotions/form', component: EmotionFormViewComponent, data: { breadcrumb: 'Nuevo' }  },
      { path: 'emotions/form/:emotion_id', component: EmotionShowViewComponent, data: { breadcrumb: 'View' }  },
      { path: 'emotions/update/:emotion_id', component: EmotionUpdateViewComponent, data: { breadcrumb: 'Actualizar' }  },
      { path: 'symptom/table', component: SymptomListViewComponent, data: { breadcrumb: 'Síntomas' }  },
      { path: 'symptom/form', component: SymptomFormViewComponent, data: { breadcrumb: 'Nuevo' }  },
      { path: 'symptom/form/:symptom_id', component: SymptomShowViewComponent, data: { breadcrumb: 'View' }  },
      { path: 'symptom/update/:symptom_id', component: SymptomUpdateViewComponent, data: { breadcrumb: 'Actualizar' }  },
      { path: 'hobbies-interest/table', component: Hobbies_InterestListViewComponent, data: { breadcrumb: 'Hobbies e intereses' }  },
      { path: 'hobbies-interest/form', component: Hobbies_InterestFormViewComponent, data: { breadcrumb: 'Nuevo' }  },
      { path: 'hobbies-interest/form/:hobbies-interest_id', component: Hobbies_InterestShowFormViewComponent, data: { breadcrumb: 'View' }  },
      { path: 'hobbies-interest/update/:hobbies-interest_id', component: Hobbies_InterestUpdateFormViewComponent, data: { breadcrumb: 'Actualizar' }  },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
