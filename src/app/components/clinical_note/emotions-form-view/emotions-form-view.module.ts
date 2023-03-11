import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmotionsFormViewComponent } from './emotions-form-view.component';

@NgModule({
    declarations: [
        EmotionsFormViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        EmotionsFormViewComponent
    ]
})

export class EmotionsFormViewModule { }