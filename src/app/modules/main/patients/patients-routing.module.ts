import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  { path: '', component: PatientListComponent, data: { breadcrumb: 'Dashboard' }  },
  // { path: 'form', component: PatientFormComponent, data: { breadcrumb: 'Nuevo' }  },
  // { path: 'form/:patient_id', component: PatientFormComponent, data: { breadcrumb: 'Nuevo' }  },
  { path: 'list', component: PatientListComponent, data: { breadcrumb: 'Lista' }  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
