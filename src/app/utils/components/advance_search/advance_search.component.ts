import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AutoFocus } from './autofocus.directive';

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

  @ViewChild('searchContainer')
  searchContainer!: ElementRef;

  options = ['name','code','date']
  aux_options = []
  data_options: AdvanceSearch[] = [];
  aux_data_options: AdvanceSearch[] = [];
  edit_mode = false;
  // {'key':'name', 'value': 'carlos', 'show': true}
  show_options = false;

  constructor() {
   }

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

  setAuxVal(event: any){
    
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
    this.edit_mode = false;
  }

  displayOptions(){
    if(!this.edit_mode){
      this.aux_data_options.push({'key':this.options[0], 'value': '', 'show': false});
      this.data_options.push({'key':this.options[0], 'value': '', 'show': false});
      this.show_options = !this.show_options;
      this.edit_mode = true;
    }
  }

  mouseEnter(option:string){
    this.data_options[this.data_options.length-1].key = option;
  }
  
  mouseLeave(){
    if(!this.edit_mode){
      this.data_options =  JSON.parse(JSON.stringify(this.aux_data_options));
    }
  }

  setOption(option: string){
    this.data_options[this.data_options.length-1].key = option;
    this.aux_data_options[this.data_options.length-1].key = option;
    this.show_options = !this.show_options;
    this.options = this.options.filter(opt=>opt!=option)
  }

  onFocus(){
    this.show_options = false;
  }
}
