import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';


import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';
import { HeaderService } from 'src/app/services/header.service';

//MODELS
import { Patient, Track } from 'src/app/models/psychotherapy.model'

//COMPONENTS
import { ClinicalNoteShowFormViewComponent } from 'src/app/components/clinical_history/clinical_note/clinical_note-show-form-view/clinical_note-show-form-view.component';

@Component({
  selector: 'app-clinical_note-form-dashboard-view',
  templateUrl: './clinical_note-form-dashboard-view.component.html',
  styleUrls: ['./clinical_note-form-dashboard-view.component.scss']
})
export class ClinicalNoteFormDashboardViewComponent implements OnInit, AfterViewInit, OnDestroy {

  patientList : Patient[] = []
  trackList = new MatTableDataSource<Track>([]);
  displayedColumns = ['session_objective', 'session_approach', 'created_at'];

  $advanceSearch!: Subscription;

  patient = {
    id: 0, 
    first_name: '',
    last_name1: '',
    last_name2: '',
    age: 0,
    email: '',
    phone_number: '',
    image: 'female-placeholder.jpg'
  };

  closeResult = ""

  constructor(
    private backendService : BackendService,
    private router : Router,
    private route: ActivatedRoute,
    private utilService : UtilService,
    private headerService : HeaderService,
    private modalService: NgbModal
  ) { 
    this.utilService.set({name:'psychotherapy', type:'dashboard'});
    this.getAll({})
  }

  ngOnInit(): void {
    this.headerService.setHeader({name:'tracking', type:'form'});
    if(this.route.snapshot.paramMap.get('patient_id')){
      this.getPatientById(this.route.snapshot.paramMap.get('patient_id'));
      this.getTrackingByPatient(this.route.snapshot.paramMap.get('patient_id'))
    }
    this.$advanceSearch! = this.headerService.getDataSearch().subscribe(data => {
      // this.getAllEmotions(data)
      console.log("Searching...");
    });
  }

  ngAfterViewInit(): void {
    this.headerService.setSetupSearch({name:'patient'});
  }

  ngOnDestroy():void{
    this.$advanceSearch.unsubscribe();
  }

  getPatientById(id:any){
    if(id){
      this.backendService.getOneById(PSYCHOTHERAPY.PATIENT_BY_ID ,id).subscribe({
        next: (v) => { this.patient = v },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  getAll(data_search:any){
    this.backendService.getAll(PSYCHOTHERAPY.PATIENT,data_search).subscribe({
      next: (v) => { this.patientList = v; console.log(this.patientList);
       },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  getTrackingByPatient(patient_id:any){
    this.backendService.getOneById(PSYCHOTHERAPY.TRACKING_BY_PATIENT, patient_id).subscribe({
      next: (v) => { this.trackList.data = v;
       },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  showNote(track:any) {
    let modal_setup: NgbModalOptions = {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-xxl',
      centered: true
    }

    const modalRef = this.modalService.open(ClinicalNoteShowFormViewComponent, modal_setup)
    modalRef.componentInstance.note = track;
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

  show(track:any){
    this.router.navigate(['main','psychotherapy','tracking','form',track.id]);
  }

  createTrack(){
    this.router.navigate(['main','psychotherapy','tracking','form']);
  }


}
