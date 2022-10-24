import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ADMINISTRATION } from 'src/app/utils/setup/routes.enum';

import { BackendService } from 'src/app/services/backend.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-psychologist-show-view',
  templateUrl: './psychologist-show-view.component.html',
  styleUrls: ['./psychologist-show-view.component.scss']
})
export class PsychologistShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

  psychologist = { 
    id: '', 
    first_name: '',
    last_name1: '',
    last_name2: '',
    age: '',
    email: '',
    phone_number: '',
    university: '',
    studies: '',
    profile: '',
    image: 'female-placeholder.jpg'
  };


  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('psychologist_id')){
      this.getPsychologistById(this.route.snapshot.paramMap.get('psychologist_id'));
    }
  }
  
  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getPsychologistById(id:any){
    if(id){
      this.backendService.getOneById(ADMINISTRATION.PSYCHOLOGIST,id).subscribe({
        next: (v) => { this.psychologist = v[0] },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

}
