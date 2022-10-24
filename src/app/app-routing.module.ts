import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';

import { LoginComponent } from 'src/app/components/public/login/login.component';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
    data: { breadcrumb: 'Tareas' } 
  },
  { 
    path: 'main', 
    loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),
    data: { breadcrumb: 'main',
    canActivate: [CanActivateLogged]
  } 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }