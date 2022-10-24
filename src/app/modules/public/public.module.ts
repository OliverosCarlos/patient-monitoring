import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialAllModule } from 'src/material.module'
import { NgSelectModule } from '@ng-select/ng-select';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { ColorCircleModule } from 'ngx-color/circle';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';

import { SideMenuModule }  from 'src/app/utils/components/side_menu/side_menu.module';
import { HeaderModule } from 'src/app/utils/components/header/header.module';
import { BreadcrumModule } from 'src/app/utils/components/breadcrumb/breadcrumb.module';

import { LoginComponent } from 'src/app/components/public/login/login.component';
const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 1
};

@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialAllModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InputFileModule.forRoot(config),
    ColorCircleModule,
    SideMenuModule,
    HeaderModule,
    BreadcrumModule
  ],
  providers: []
})
export class PublicModule { }
