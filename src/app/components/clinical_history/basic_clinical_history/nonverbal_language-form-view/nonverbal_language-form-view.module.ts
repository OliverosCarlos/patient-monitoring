import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { NonverbalLanguageFormViewComponent } from './nonverbal_language-form-view.component';

@NgModule({
    declarations: [
        NonverbalLanguageFormViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        AngularEditorModule
    ],
    exports: [
        NonverbalLanguageFormViewComponent
    ]
})

export class NonVerbalLanguageFormViewModule { }