import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import {RouterModule} from '@angular/router';

import { MaterialAllModule } from 'src/material.module'
import { SideNavHeaderMenuComponent } from './side_nav_header_menu.component';

@NgModule({
    declarations: [
        SideNavHeaderMenuComponent
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
        SideNavHeaderMenuComponent
    ]
})

export class SideNavHeaderMenuModule { }