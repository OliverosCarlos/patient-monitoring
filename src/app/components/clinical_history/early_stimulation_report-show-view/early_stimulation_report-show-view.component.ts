import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NEUROPSYCHO } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//models
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model'

@Component({
  selector: 'app-early_stimulation_report-show-view',
  templateUrl: './early_stimulation_report-show-view.component.html',
  styleUrls: ['./early_stimulation_report-show-view.component.scss']
})
export class EarlyStimulationReportShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

  model : Model;

  data = {
    medical_history: '',
    background: '',
    intelligence_assessment: '',
    attention: '',
    memory: '',
    language: '',
    praxias: '',
    gnosias: '',
    executive_functioning: '',
    mind_state: '',
    personality: '',
    treatment: '',
  };

  $headerAction!: Subscription;

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private router : Router,
    private headerService : HeaderService,
    private utilService: UtilService,
    private fileSaverService: FileSaverService
  ) {
    this.model = MODELS.find(model => model.name == 'early-stimulation-report')!;

  }

  
  ngOnInit() {
    this.headerService.setHeader({model: this.model, type: 'show'});
    this.utilService.set({name:'early-stimulation-report', type:'show'});
    if(this.route.snapshot.paramMap.get('medical_history_report_id')){
      this.getEarlyStimulationReportById(this.route.snapshot.paramMap.get('medical_history_report_id'));
    }
  }
  
  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'edit':
          this.edit();
          break;
        case 'handle_exportar_pdf':
          this.handle_exportar_pdf();
          break;
        default:
          break;
      }
    });
  }

  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getEarlyStimulationReportById(id:any){
    if(id){
      this.backendService.getOneById(NEUROPSYCHO.MEDICAL_HISTORY_REPORT, id).subscribe({
        next: (v) => { 
          this.data = v;
         },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  
  handle_exportar_pdf(){
    if(this.data){
      this.backendService.getFile(NEUROPSYCHO.MEDICAL_HISTORY_EXPORT , this.data.medical_history).subscribe({
        next: (v) => {
          this.fileSaverService.save(v.body, 'reporte.pdf');
         },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
    }
  }

  edit(){
    this.router.navigate(['../', 'main', 'clinical-history', 'early-stimulation', 'report-update', this.route.snapshot.paramMap.get('medical_history_report_id')]);
  }

}
