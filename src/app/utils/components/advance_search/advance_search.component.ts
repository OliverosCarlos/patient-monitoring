import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

//MODELS 
import { AdvanceSearch } from 'src/app/models/advance_search.model';
//SETUPS
//SERVICES

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-advance-search',
  templateUrl: './advance_search.component.html',
  styleUrls: ['./advance_search.component.scss']
})
export class AdvanceSearchComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('searchOptions')
  searchOptions!: ElementRef;

  options = ['name','code']
  data_options!: AdvanceSearch[];

  show_options = false;

  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  action(){
    alert('HELLO')
  }

  optionActivated(id:string){
    this.data_options = this.data_options.map(opt => (
      opt.key == id ? 
      {'key':opt.key, 'value': opt.value, 'show': false} :
      {'key':opt.key, 'value': opt.value, 'show': true}
    ));
  }

  inputSetVal(event: any){
    let id = event.target.id.split('-')[1]

    if(event.target.value == ''){
      this.data_options = this.data_options.filter( opt => opt.key != id);
    }else{
      this.data_options = this.data_options.map(opt => (
        opt.key == id ? 
        {'key':id, 'value': event.target.value, 'show': true} :
        {'key':opt.key, 'value': opt.value, 'show': true}
        ) );
    }
  }

  displayOptions(){
    this.show_options = !this.show_options; 
  }

}
