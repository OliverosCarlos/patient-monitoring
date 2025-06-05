import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { FunctionalityAnalysisFormViewComponent } from './functionality_analysis-form-view.component';

@NgModule({
    declarations: [
        FunctionalityAnalysisFormViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgSelectModule
    ],
    exports: [
        FunctionalityAnalysisFormViewComponent
    ]
})

export class FunctionalityAnalysisFormViewModule { }