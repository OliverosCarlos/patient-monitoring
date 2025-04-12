import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientDashboardViewComponent } from 'src/app/components/patient/patient-dashboard-view/patient-dashboard-view.component'
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';

import { PsychoterapyPatientFormComponent } from 'src/app/components/patient/psychoterapy/psychoterapy_patient-form/psychoterapy_patient-form.component';
import { EarlyStimulationPatientFormComponent } from 'src/app/components/patient/early_stimulation/early_stimulation_patient-form/early_stimulation_patient-form.component';
import { NeuroPsychologyPatientFormComponent } from 'src/app/components/patient/neuro_psychology/neuro_psychology_patient-form/neuro_psychology_patient-form.component';


const routes: Routes = [
  { path: '', component: PatientsComponent, data: { breadcrumb: 'Pacientes' }, 
    children:[
      { path: '', component: PatientDashboardViewComponent, data: { breadcrumb: 'Dashboard' } },
      { path: 'psychoterapy/form', component: PsychoterapyPatientFormComponent, data: { breadcrumb: 'Psicoterapia' } },
      { path: 'early-stimulation/form', component: EarlyStimulationPatientFormComponent, data: { breadcrumb: 'Estimulación Temprana' } },
      { path: 'neuro-psychology/form', component: NeuroPsychologyPatientFormComponent, data: { breadcrumb: 'Neuro Psicología' } },
    ]
  },
  // { path: 'form', component: PatientFormComponent, data: { breadcrumb: 'Nuevo' }  },
  // { path: 'form/:patient_id', component: PatientFormComponent, data: { breadcrumb: 'Nuevo' }  },
  { path: 'list', component: PatientListComponent, data: { breadcrumb: 'Lista' }  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
