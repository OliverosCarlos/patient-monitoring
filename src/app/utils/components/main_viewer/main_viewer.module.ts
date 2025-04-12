import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import {RouterModule} from '@angular/router';

import { MaterialAllModule } from 'src/material.module'
import { MainViewerComponent } from './main_viewer.component';
import { HeaderModule } from 'src/app/utils/components/header/header.module';


@NgModule({
    declarations: [
        MainViewerComponent
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ColorCircleModule,
        RouterModule,
        MaterialAllModule,
        HeaderModule
    ],
    exports: [
        MainViewerComponent
    ]
})

export class MainViewerModule { }