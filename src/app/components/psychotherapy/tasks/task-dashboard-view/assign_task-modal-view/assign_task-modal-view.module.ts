import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';

import { AssignTaskModalViewComponent } from './assign_task-modal-view.component';

import { AdvanceSearchModule } from 'src/app/utils/components/advance_search/advance_search.module';

import { MaterialAllModule } from 'src/material.module';

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
        AdvanceSearchModule,
        MatDialogModule,
        MaterialAllModule
    ],
    exports: [
        AssignTaskModalViewComponent
    ]
})

export class AssignTaskModalViewModule { }
