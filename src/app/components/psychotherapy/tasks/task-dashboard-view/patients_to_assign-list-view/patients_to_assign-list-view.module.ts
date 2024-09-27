//File generated by vaweei CLI
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialAllModule } from 'src/material.module' //we need more accurate imports from this library
//import { InputFileConfig, InputFileModule } from 'ngx-input-file';

import { PatientsToAssignListViewComponent } from './patients_to_assign-list-view.component';

import { AdvanceSearchModule } from 'src/app/utils/components/advance_search/advance_search.module';

//const config: InputFileConfig = {
//  fileAccept: '*',
//  fileLimit: 1
//};

@NgModule({
    declarations: [
        PatientsToAssignListViewComponent,
    ],
    providers: [],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxSpinnerModule,
        //InputFileModule.forRoot(config),
        MaterialAllModule,
        AdvanceSearchModule
    ],
    exports: [
        PatientsToAssignListViewComponent
    ]
})

export class PatientsToAssignListViewModule {}       
        