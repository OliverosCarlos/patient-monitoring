import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';
import {RouterModule} from '@angular/router';

import { MaterialAllModule } from 'src/material.module'
import { AdvanceSearchComponent } from './advance_search.component';
import { AutoFocus } from './autofocus.directive';

@NgModule({
    declarations: [
        AdvanceSearchComponent,
        AutoFocus
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
        AdvanceSearchComponent
    ]
})

export class AdvanceSearchModule { }