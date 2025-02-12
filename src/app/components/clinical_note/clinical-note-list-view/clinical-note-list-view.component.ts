//File generated by vaweei CLI
import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICE
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { HobbiesInterestService } from 'src/app/services/catalogs/hobbies_interest.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS
import { CL_brief_list } from 'src/app/models/clinical_note.model';
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-clinical-note-list-view',
  templateUrl: './clinical-note-list-view.component.html',
  styleUrls: ['./clinical-note-list-view.component.scss']
})
export class Clinical_NoteListViewComponent implements OnInit {

  model : Model;

  displayedColumns = ['select' , 'patient', 'email', 'therapy_objectives', 'personal_characteristics' ];
  dataSource = new MatTableDataSource<CL_brief_list>([]);
  selection = new SelectionModel<CL_brief_list>(true, []);
  
  clinical_note_list: any = []

  constructor(
    private router : Router,
    private headerService : HeaderService,
    private hobbiesInterestService : HobbiesInterestService,
    private utilService: UtilService,
    private backendService : BackendService
    ) {
      this.model = MODELS.find(model => model.name == 'clinical_notes')!;
    }

  ngOnInit(): void {
    this.getAll();
    this.headerService.setHeader({model: this.model, type: 'list'});
    this.utilService.set({name:'clinical_notes', type:'list'});
  }

  getAll(){
   this.backendService.getAll(PSYCHOTHERAPY.CLINICAL_NOTES,{}).subscribe({
     next: (v) => { this.buildDataTable(v) },
     error: (e) => console.error(e),
     complete: () => console.info('complete')
   });
  }

  deleteHobbies_Interest(){
    // this.hobbiesInterestService.deleteHobbiesInterests(this.selection.selected.map(function(hobbies_interest_data){return hobbies_interest_data.id})).subscribe({
    //  next: (v) => { console.log(v) },
    //  error: (e) => console.error(e),
    //  complete: () => this.getAll()
    // });
  }

  show(data:CL_brief_list){
    this.router.navigate(['main','psychotherapy','clinical-notes','form',data.id]);
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: CL_brief_list): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

  buildDataTable(data:[any]){
    data.filter(x=>x.clinical_notes.length > 0).forEach((patient) =>{
      this.clinical_note_list.push({
        'id': patient.id,
        'patient': patient.first_name+' '+patient.last_name2,
        'email': patient.email,
        'therapy_objectives': patient.clinical_notes[0].therapy_objectives[0].notes,
        'personal_characteristics': patient.clinical_notes[0].personal_characteristics[0].notes
      })
    })
    this.dataSource.data = this.clinical_note_list;
  }
}
    