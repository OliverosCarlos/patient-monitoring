import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule} from '@angular/router';
import { MaterialAllModule } from 'src/material.module' //we need more accurate imports from this library
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule} from '@angular/material/icon';

import { PatientAssignedListViewComponent } from './patient_assigned-list-view.component';

import { AdvanceSearchModule } from 'src/app/utils/components/advance_search/advance_search.module';

@NgModule({
    declarations: [
        PatientAssignedListViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxSpinnerModule,
        NgSelectModule,
        RouterModule,
        MatSliderModule,
        MatIconModule,
        AdvanceSearchModule,
        MaterialAllModule
    ],
    exports: [
        PatientAssignedListViewComponent
    ]
})

export class PatientAssignedListViewModule { }