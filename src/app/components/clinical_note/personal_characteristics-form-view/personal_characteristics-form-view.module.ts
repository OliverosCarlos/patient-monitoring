import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PersonalCharacteristicsFormViewComponent } from './personal_characteristics-form-view.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
    declarations: [
        PersonalCharacteristicsFormViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        AngularEditorModule
    ],
    exports: [
        PersonalCharacteristicsFormViewComponent
    ]
})

export class PersonalCharacteristicsFormViewModule { }