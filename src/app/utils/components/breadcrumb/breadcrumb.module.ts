import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import {RouterModule} from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb.component';

import { MaterialAllModule } from 'src/material.module'

@NgModule({
    declarations: [
        BreadcrumbComponent,
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
        BreadcrumbComponent
    ]
})

export class BreadcrumModule { }