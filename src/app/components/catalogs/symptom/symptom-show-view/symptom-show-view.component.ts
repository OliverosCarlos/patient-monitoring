import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CATALOGS } from 'src/app/utils/setup/routes.enum'; 

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-symptom-show-view',
  templateUrl: './symptom-show-view.component.html',
  styleUrls: ['./symptom-show-view.component.scss']
})
export class SymptomShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

  model : Model;

  symptom = { 
    id: '', 
    code: '',
    name: '',
    description: '',
    color: ''
  };

  $headerAction!: Subscription;

  constructor(
    private headerService: HeaderService,
    private backendService : BackendService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private router : Router
  ) {
    this.model = MODELS.find(model => model.name == 'symptom')!;
  }

  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'edit':
          this.edit();
          break;
      
        default:
          break;
      }
    });

    this.utilService.set({name:'symptom', type:'show'});
  }

  ngOnInit() {
    this.headerService.setHeader({model: this.model, type:'show'});
    if(this.route.snapshot.paramMap.get('symptom_id')){
      this.getSymptomById(this.route.snapshot.paramMap.get('symptom_id'));
    }
  }
  
  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getSymptomById(id:any){
    if(id){
      this.backendService.getOneById(CATALOGS.SYMPTOMS ,id).subscribe({
        next: (v) => { this.symptom = v },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  updateEmotion(){
    this.router.navigate(['main','catalogs','symptom','update',this.route.snapshot.paramMap.get('symptom_id')]);
  }

  edit(){
    this.router.navigate(['main','catalogs','symptom','update',this.route.snapshot.paramMap.get('symptom_id')]);
  }

}
