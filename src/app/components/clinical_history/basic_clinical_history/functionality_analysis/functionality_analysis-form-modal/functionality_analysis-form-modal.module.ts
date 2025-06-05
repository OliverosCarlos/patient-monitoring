import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { FunctionalityAnalysisFormModalComponent } from './functionality_analysis-form-modal.component';
import { FunctionalityAnalysisListViewModule } from 'src/app/components/clinical_note/functionality_analysis/functionality_analysis-list-view/functionality_analysis-list-view.module';
import { FunctionalityAnalysisFormViewModule } from 'src/app/components/clinical_note/functionality_analysis/functionality_analysis-form-view/functionality_analysis-form-view.module';

@NgModule({
    declarations: [
        FunctionalityAnalysisFormModalComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgSelectModule,
        FunctionalityAnalysisListViewModule,
        FunctionalityAnalysisFormViewModule
    ],
    exports: [
        FunctionalityAnalysisFormModalComponent
    ]
})

export class FunctionalityAnalysisFormModalModule { }