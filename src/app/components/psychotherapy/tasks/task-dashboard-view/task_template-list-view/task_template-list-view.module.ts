//File generated by vaweei CLI
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialAllModule } from 'src/material.module' //WARNIGN! we need more accurate imports from this library
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { TaskTemplateListViewComponent } from './task_template-list-view.component';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({
    declarations: [
        TaskTemplateListViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxSpinnerModule,
        //InputFileModule.forRoot(config),
        MaterialAllModule
    ],
    exports: [
        TaskTemplateListViewComponent
    ]
})

export class TaskTemplateListViewModule {}       
        