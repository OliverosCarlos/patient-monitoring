import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HobbiesInterestsFormViewComponent } from './hobbies_interests-form-view.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    declarations: [
        HobbiesInterestsFormViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        AngularEditorModule,
        NgSelectModule
    ],
    exports: [
        HobbiesInterestsFormViewComponent
    ]
})

export class HobbiesInterestsFormViewModule { }