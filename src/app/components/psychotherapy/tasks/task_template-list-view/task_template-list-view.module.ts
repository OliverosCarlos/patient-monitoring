import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { TaskTemplateListViewComponent } from './task_template-list-view.component';

@NgModule({
    declarations: [
        TaskTemplateListViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgSelectModule
    ],
    exports: [
        TaskTemplateListViewComponent
    ]
})

export class TaskTemplateListViewModule { }