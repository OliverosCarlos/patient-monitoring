import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//SERVICES
import { SymptomService } from 'src/app/services/catalogs/symptom.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-symptom-show-view',
  templateUrl: './symptom-show-view.component.html',
  styleUrls: ['./symptom-show-view.component.scss']
})
export class SymptomShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

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
    private symptomService: SymptomService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private router : Router
  ) {}

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
    this.headerService.setHeader({name:'symptom',type:'show'});
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
      this.symptomService.getSymptomById(id).subscribe({
        next: (v) => { this.symptom = v[0] },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  updateEmotion(){
    this.router.navigate(['catalogs','symptom','update',this.route.snapshot.paramMap.get('emotion_id')]);
  }

  edit(){
    this.router.navigate(['catalogs','symptom','update',this.route.snapshot.paramMap.get('symptom_id')]);
  }

}
