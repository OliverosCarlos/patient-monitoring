import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CLINICAL_HISTORY } from 'src/app/utils/setup/routes.enum'; 
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
  selector: 'app-clinical_history_early_stimulation-show-view',
  templateUrl: './clinical_history_early_stimulation-show-view.component.html',
  styleUrls: ['./clinical_history_early_stimulation-show-view.component.scss']
})
export class ClinicalHistoryEarlyStimulationShowViewComponent implements OnInit, OnDestroy {

  model : Model;
  data!: Medical_history

  $headerAction!: Subscription;

  _id = ""
  medical_history_report_id = ""
  report_created = false;

  private _patient_id: any[] = [];
  @Input()
  set patient_id(value: any) {
    this._patient_id = value;
    if(value){
      console.log("PATIENT ID", value);
      this.getClinicalHistoryById(value)
    }
  }
  get patient_id(): any { return this._patient_id}

  isEmpty = false;

  constructor(
    private backendService : BackendService,
  ) {
    this.model = MODELS.find(model => model.name == 'early-stimulation')!;
    this.data = {}
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getClinicalHistoryById(id:any){
    if(id){
      this.backendService.getOneById(CLINICAL_HISTORY.EARLY_STIMULATION ,id).subscribe({
        next: (v) => {
          if(v.success){
            this.data = {
              id: v.data.id,
              source_information: v.data.source_information,
              reason_consultation: v.data.reason_consultation,
              medical_diagnosis: v.data.medical_diagnosis,
              patient: v.data.patient,
              parental_data: v.data.parental_data,
              prenatal_history: v.data.prenatal_history,
              hereditary_family_history: v.data.hereditary_family_history,
              personal_pathologic_antecedents: v.data.personal_pathologic_antecedents
            };
            // this.medical_history_report_id = v.medical_history_report[0].id
            this.isEmpty = false;
          }

        },
        error: (e) =>  {
          if(e.status == 404){
            this.isEmpty = true;
          }
          console.error(e);
        },
        complete: () => console.info('complete')
      });
    }
  }

}