import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';
import { LoginComponent } from 'src/app/components/public/login/login.component';
import { SessionExpiredComponent } from 'src/app/components/public/session-expired/session-expired.component';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full', data: { breadcrumb: 'Public' } },
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'login' } },
  { path: 'session-expired', component: SessionExpiredComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
