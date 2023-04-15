import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialAllModule } from 'src/material.module'
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { ColorCircleModule } from 'ngx-color/circle';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { SideMenuModule } from 'src/app/utils/components/side_menu/side_menu.module';
import { HeaderModule } from 'src/app/utils/components/header/header.module';
import { BreadcrumModule } from 'src/app/utils/components/breadcrumb/breadcrumb.module';
import { PerfilMenuModule } from 'src/app/utils/components/perfil_menu/perfil_menu.module';

const config: InputFileConfig = {
  fileAccept: '*',
  fileLimit: 1
};

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    InputFileModule.forRoot(config),
    ColorCircleModule,
    MatNativeDateModule,
    HttpClientModule,
    NgbModule,
    SideMenuModule,
    HeaderModule,
    BreadcrumModule,
    PerfilMenuModule
  ],
  providers: []
})
export class MainModule { }
