import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AutoFocus } from './autofocus.directive';

//MODELS 
import { AdvanceSearch } from 'src/app/models/advance_search.model';
//SETUPS
import { MODELS } from 'src/app/utils/setup/model.setup';
//SERVICES
import { HeaderService } from 'src/app/services/header.service';

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

  options : any = []
  aux_options = []
  data_options: AdvanceSearch[] = [];
  aux_data_options: AdvanceSearch[] = [];
  edit_mode = false;
  show_options = false;
  dataToSearch = new Map<string, string>()

  showMultipleViewOption = false;

  $advanceSearch!: Subscription;

  constructor(
    private headerService : HeaderService,  ) {
   }

  ngOnInit() {
    this.$advanceSearch! = this.headerService.getSetupSearch().subscribe(data => {
      this.options = MODELS.filter(x=>x.name==data.name)[0].options;
      this.data_options = [];
      this.edit_mode = false;
      this.show_options = false;
      this.dataToSearch.clear();
    });
  }

  ngAfterViewInit(): void {
  }



  ngOnDestroy() {
    this.$advanceSearch!.unsubscribe();
  }

  action(){
    alert('HELLO')
  }

  optionActivated(e:any,id:string){
    e.stopPropagation();
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
    this.edit_mode = false;
    this.data_options.forEach(opt => {
      this.dataToSearch.set(opt.key+'__contains',opt.value)
    });
    this.headerService.setDataSearch(Object.fromEntries(this.dataToSearch));
  }


  displayOptions(e:any){
    e.stopPropagation();
    if(!this.edit_mode){
      this.aux_data_options.push({'key':this.options[0], 'value': '', 'show': false});
      this.data_options.push({'key':this.options[0], 'value': '', 'show': false});
      this.show_options = !this.show_options;
      this.edit_mode = true;
    }
  }

  //Change last option to current mouse position
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
    this.options = this.options.filter((opt: string)=>opt!=option)    
  }

  onFocus(){
    this.show_options = false;
  }

  stopProp(e:any){
    e.stopPropagation();
  }

  deleteOption(e:any, key:any){
    e.stopPropagation();
    this.data_options = this.data_options.filter(opt => opt.key != key)    
    this.options.push(key)
    this.dataToSearch.delete(key+'__contains')
    this.headerService.setDataSearch(Object.fromEntries(this.dataToSearch));
  }

  //Change View Action
  changeToTableView(){ this.headerService.sendOutAction({action:'view', type:'table'}) }
  changeToCardView(){ this.headerService.sendOutAction({action:'view', type:'card'}) }
 
}
