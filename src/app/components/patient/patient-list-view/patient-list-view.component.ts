import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { PATIENT } from 'src/app/utils/setup/routes.enum';

//services
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//models
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

@Component({
  selector: 'app-patient-list-view',
  templateUrl: './patient-list-view.component.html',
  styleUrls: ['./patient-list-view.component.scss']
})
export class PatientListViewComponent implements OnInit, AfterViewInit, OnDestroy {

  model : Model;

  displayedColumns = ['name','type'];
  dataSource = new MatTableDataSource<Emotion>([]);
  selection = new SelectionModel<Emotion>(true, []);
  searchAttributes : any[] = ['first_name', 'last_name1', 'last_name2']

  $headerAction!: Subscription;
  $advanceSearch!: Subscription;


  constructor(
    private backendService : BackendService,
    private router : Router,
    private spinner: NgxSpinnerService,
    private headerService : HeaderService,
    private utilService: UtilService
    ) {
      this.model = MODELS.find(model => model.name == 'patient')!;
    }

  ngOnInit(): void {
    this.getAllGeneralPatients({});
    this.headerService.setHeader({model: this.model, type:'dashboard'});
    this.utilService.set({name:'patient', type:'dashboard'});
  }

  ngAfterViewInit(): void {
    this.$headerAction! = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'delete':
          this.deletePsychologists();
          break;
      
        default:
          break;
      }
    });
    this.$advanceSearch! = this.headerService.getDataSearch().subscribe(data => {
      this.getAllGeneralPatients(data)
    });
  }



  ngOnDestroy():void{
    this.$headerAction!.unsubscribe();
    this.$advanceSearch!.unsubscribe();
  }

  getAllGeneralPatients(data_search:any){
    this.spinner.show('loading')
    this.backendService.getAll(PATIENT.GENERAL, data_search).subscribe({
      next: (v) => { this.dataSource.data = v; console.log(v);
       },
      error: (e) => console.error(e),
      complete: () => this.spinner.hide('loading')
    });
  }

  deletePsychologists(){
    // this.backendService.delete(CATALOGS.EMOTIONS,this.selection.selected.map(function(emotion){return emotion.id})).subscribe({
    //   next: (v) => { console.log(v) },
    //   error: (e) => console.error(e),
    //   complete: () => this.getAllEmotions({})
    // });
  }

  viewPatient(patient:any){
    console.log("PATIENT 2 SHOW -> ", patient);
    if(patient.psychoterapy_patient != null){
      this.router.navigate(['main','patients','psychoterapy','show',patient.id]);
    }
    if(patient.early_stimulation_patient != null){
      this.router.navigate(['main','patients','early-stimulation','show',patient.id]);
    }
    if(patient.neuro_psychology_patient != null){
      this.router.navigate(['main','patients','neuro-psychology','show',patient.id]);
    }
    
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
    checkboxLabel(row?: Emotion): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    setSearchAttributes(attributes: any){
      this.getAllGeneralPatients(attributes);
    }

}

export interface Emotion {
  id: number,
  code: string,
  name: string,
  description: string,
  color: string
}