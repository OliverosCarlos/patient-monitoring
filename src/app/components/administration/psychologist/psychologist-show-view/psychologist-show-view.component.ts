import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PsychologistService } from 'src/app/services/administration/psychologist.service';
// import { CrudService } from 'src/app/providers/api/crud.service';
// import { Handler } from 'src/app/utils/handler';
// import swal from 'sweetalert2';
// import { Utils } from 'src/app/utils/utils';
// import { Router } from '@angular/router';
// import { PATH_REQUEST } from 'src/app/utils/enums/pathRequest.enum';
// import { SessionService, AddressesService, StepperFisherProducerFormService } from 'src/app/providers/providers.index';
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
    private psychologistService: PsychologistService,
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
      this.psychologistService.getPsychologistById(id).subscribe({
        next: (v) => { this.psychologist = v[0] },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

}
