import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import {RouterModule} from '@angular/router';

import { HeaderComponent } from './header.component';

import { MaterialAllModule } from 'src/material.module'
import { AdvanceSearchModule } from 'src/app/utils/components/advance_search/advance_search.module';
import { SideNavHeaderMenuModule } from 'src/app/utils/components/side_nav_header_menu/side_nav_header_menu.module';


@NgModule({
    declarations: [
        HeaderComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MaterialAllModule,
        ColorCircleModule,
        RouterModule,
        AdvanceSearchModule,
        SideNavHeaderMenuModule
    ],
    exports: [
        HeaderComponent
    ]
})

export class HeaderModule { }