import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NEUROPSYCHO } from 'src/app/utils/setup/routes.enum'; 
import { FileSaverService } from 'ngx-filesaver';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS 
import { Medical_history } from 'src/app/models/early_stimulation.model'
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-early_stimulation-show-view',
  templateUrl: './early_stimulation-show-view.component.html',
  styleUrls: ['./early_stimulation-show-view.component.scss']
})
export class EarlyStimulationShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

  model : Model;
  data!: Medical_history

  $headerAction!: Subscription;

  _id = ""
  medical_history_report_id = ""
  report_created = false;

  constructor(
    private headerService: HeaderService,
    private backendService : BackendService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private router : Router,
    private fileSaverService: FileSaverService
  ) {
    this.model = MODELS.find(model => model.name == 'early-stimulation')!;
    this.data = {}
    this._id = this.route.snapshot.paramMap.get('early_stimulation_id')!

  }

  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'edit':
          this.edit();
          break;
        case 'handle_generate_report':
          this.handle_generate_report();
          break;
        default:
          break;
      }
    });

    this.utilService.set({name:'early-stimulation', type:'show'});
  }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('early_stimulation_id')){
      this.getMedicalHistoryReportByMH(this.route.snapshot.paramMap.get('early_stimulation_id'))
      this.getSymptomById(this.route.snapshot.paramMap.get('early_stimulation_id'));
    }else{
      this.headerService.setHeader({model: this.model, type: 'show'});
    }
  }
  
  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getSymptomById(id:any){
    if(id){
      this.backendService.getOneById(NEUROPSYCHO.MEDICAL_HISTORY ,id).subscribe({
        next: (v) => {
          this.data = {
            id: v.id,
            source_information: v.source_information,
            reason_consultation: v.reason_consultation,
            medical_diagnosis: v.medical_diagnosis,
            patient: v.patient,
            parental_data: v.parental_data[0],
            prenatal_history: v.prenatal_history[0],
            hereditaryFamily_history: v.hereditaryFamily_history[0],
            personal_pathologic_antecedents: v.personal_pathologic_antecedents[0]
          }; 
          this.medical_history_report_id = v.medical_history_report[0].id
         },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  updateEmotion(){
    this.router.navigate(['main','catalogs','symptom','update',this.route.snapshot.paramMap.get('emotion_id')]);
  }

  edit(){
    this.router.navigate(['main','catalogs','symptom','update',this.route.snapshot.paramMap.get('symptom_id')]);
  }

  getMedicalHistoryReportByMH(medical_history_id:any){
    if(medical_history_id){
      this.backendService.getOneById(NEUROPSYCHO.MEDICAL_HISTORY_REPORT+'by-medical-history-id/', medical_history_id).subscribe({
        next: (v) => {
          if(v){
            if(this.model.activities){
              this.model.activities[0].disabled=false
              this.report_created = true
            }
          }
          this.headerService.setHeader({model: this.model, type: 'show'});
         },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  handle_exportar_pdf(){
    if(this._id){
      this.backendService.getFile(NEUROPSYCHO.MEDICAL_HISTORY_EXPORT , this._id).subscribe({
        next: (v) => {
          console.log(v);
          this.data = v;
          
          
          this.fileSaverService.save(v.body, 'reporte.pdf');
         },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
    }
  }

  handle_generate_report(){
    if (this.report_created) {
      this.router.navigate(['main','clinical-history','early-stimulation','report-show',this.medical_history_report_id]);
    }else{
      this.router.navigate(['main','clinical-history','early-stimulation','report-form',this._id]);
    }
  }

}