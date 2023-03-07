import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

import { Subscription } from 'rxjs';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

//SERVICES
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';
import { GenericModalService } from 'src/app/utils/services/generic_modal.service';
import { TaskService } from 'src/app/services/psychotherapy/task.service';
import { BackendService } from 'src/app/services/backend.service';

//COMPONENTS
import { GenericModalComponent } from 'src/app/utils/components/generic-modal/generic-modal.component';

@Component({
  selector: 'app-task_assignment-form-view',
  templateUrl: './task_assignment-form-view.component.html',
  styleUrls: ['./task_assignment-form-view.component.scss']
})
export class TaskAssignmentFormViewComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['select', 'first_name', 'task', 'status'];
  dataSource = new MatTableDataSource<Patient>([]);
  selection = new SelectionModel<Patient>(true, []);

  closeResult = '';

  templates = [{name:'',patients:[{name:''}]}]

  $headerAction!: Subscription;
  $modalService!: Subscription;

  constructor(
    private backendService : BackendService,
    private router : Router,
    private headerService : HeaderService,
    private utilService : UtilService,
    private modalService: NgbModal,
    private genericModalService: GenericModalService,
    private taskService: TaskService
    ) { }

  ngAfterViewInit(): void {
    this.$headerAction! = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'config':
          this.open();
          break;
      
        default:
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.$headerAction.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllPatients();
    this.headerService.setHeader({name:'patient', type:'list'});
    this.utilService.set({name:'patient', type:'list'});
  }

  getAllPatients(){
    this.backendService.getAll(PSYCHOTHERAPY.PATIENTS_TASKS_ASSIGNED,{}).subscribe({
      next: (v) => { this.dataSource.data = v; console.log(v);
       },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  // deletePatients(){
  //   this.patientService.deletePatients(this.selection.selected.map(function(patient){return patient.id})).subscribe({
  //     next: (v) => { console.log(v) },
  //     error: (e) => console.error(e),
  //     complete: () => this.getAllPatients()
  //   });
  // }

  viewPatent(patient:Patient){
    this.router.navigate(['psychotherapy','patients','form',patient.id]);

// Navigate without updating the URL, overriding the default behavior
// router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
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
    checkboxLabel(row?: Patient): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    open() {
      let modalConfig = {
        title:'Asignar tarea',
        save: function(service:TaskService, cad:string){
          service.assignTask(cad).subscribe({
            next: (v: any) => { console.log(v); },
            error: (e: any) => console.error(e),
            complete: () => console.log('completed')//this.router.navigate(['psychotherapy','task','dashboard'])
          })
        },
        service: this.taskService
      }
      this.genericModalService.setModalDefinition(modalConfig);

      let modal_setup: NgbModalOptions = {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'modal-md'    
      }
  
      this.modalService.open(GenericModalComponent, modal_setup
        ).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

}

export interface Patient {
  id: number,
  first_name: string;
  last_name1: string;
  last_name2: string;
  age: number;
  email: string;
  phone_number: string;
}