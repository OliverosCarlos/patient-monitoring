//File generated by vaweei CLI
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//import { PruebaService } from 'src/app/services/catalogs/prueba.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-prueba-show-form-view',
  templateUrl: './prueba-show-form-view.component.html',
  styleUrls: ['./prueba-show-form-view.component.scss']
})
export class PruebaShowFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  record = { 
    id: '', 
    code: '', name: '', description: '', age: '', 
  };


  constructor(
    //private pruebaService: PruebaService,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('prueba_id')){
      //this.getPruebaById(this.route.snapshot.paramMap.get('prueba_id'));
    }
  }
  
  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getPruebaById(id:any){
    //if(id){
    //  this.pruebaService.getPruebaById(id).subscribe({
    //    next: (v) => { this.prueba = v[0] },
    //    error: (e) => console.error(e),
    //    complete: () => console.info('complete')
    //  });
    //}
  }

  updateEmotion(){
    //this.router.navigate(['catalogs','prueba','update',this.route.snapshot.paramMap.get('prueba_id')]);
  }

}
    