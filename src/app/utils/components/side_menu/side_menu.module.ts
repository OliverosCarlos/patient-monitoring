import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import {RouterModule} from '@angular/router';

import { SideMenuComponent } from './side_menu.component';

import { MaterialAllModule } from 'src/material.module'

@NgModule({
    declarations: [
        SideMenuComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MaterialAllModule,
        ColorCircleModule,
        RouterModule
    ],
    exports: [
        SideMenuComponent
    ]
})

export class SideMenuModule { }