import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { AssignTaskModalViewComponent } from './assign_task-modal-view.component';

import { AdvanceSearchModule } from 'src/app/utils/components/advance_search/advance_search.module';

@NgModule({
    declarations: [
        AssignTaskModalViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgSelectModule,
        AdvanceSearchModule
    ],
    exports: [
        AssignTaskModalViewComponent
    ]
})

export class AssignTaskModalViewModule { }