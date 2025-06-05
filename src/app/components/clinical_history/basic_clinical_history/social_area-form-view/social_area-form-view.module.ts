import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SocialAreaFormViewComponent } from './social_area-form-view.component';

@NgModule({
    declarations: [
        SocialAreaFormViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
    ],
    exports: [
        SocialAreaFormViewComponent
    ]
})

export class SocialAreaFormViewModule { }