import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import {RouterModule} from '@angular/router';

import { MaterialAllModule } from 'src/material.module'
import { PerfilMenuComponent } from './perfil_menu.component';

@NgModule({
    declarations: [
        PerfilMenuComponent
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ColorCircleModule,
        RouterModule,
        MaterialAllModule
    ],
    exports: [
        PerfilMenuComponent
    ]
})

export class PerfilMenuModule { }