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

  searchAttributes : any = []
  aux_searchAttributes = []
  data_searchAttributes: AdvanceSearch[] = [];
  aux_data_searchAttributes: AdvanceSearch[] = [];
  edit_mode = false;
  show_searchAttributes = false;
  dataToSearch = new Map<string, string>()

  showMultipleViewOption = false;

  $advanceSearch!: Subscription;

  constructor(
    private headerService : HeaderService,  ) {
   }

  ngOnInit() {
    console.log("SEARCH");

  }

  ngAfterViewInit(): void {
    this.$advanceSearch! = this.headerService.getSetupSearch().subscribe(data => {
      console.log("SEARCH");
      
      console.log(data);
      
      this.searchAttributes = MODELS.filter(x=>x.name==data.name)[0].searchAttributes;
      console.log(this.searchAttributes);
      
      this.data_searchAttributes = [];
      this.edit_mode = false;
      this.show_searchAttributes = false;
      this.dataToSearch.clear();
    });
  }



  ngOnDestroy() {
    this.$advanceSearch!.unsubscribe();
  }

  action(){
    alert('HELLO')
  }

  attributeActivated(e:any,id:string){
    e.stopPropagation();
    this.data_searchAttributes = this.data_searchAttributes.map(opt => (
      opt.key == id ?
      {'key':opt.key, 'value': opt.value, 'show': false} :
      {'key':opt.key, 'value': opt.value, 'show': true}
    ));
  }

  inputSetVal(event: any){
    let id = event.target.id.split('-')[1]
    if(event.target.value == ''){
      this.data_searchAttributes = this.data_searchAttributes.filter( opt => opt.key != id);
    }else{
      this.data_searchAttributes = this.data_searchAttributes.map(opt => (
        opt.key == id ? 
        {'key':id, 'value': event.target.value, 'show': true} :
        {'key':opt.key, 'value': opt.value, 'show': true}
        ) );
    }
    this.edit_mode = false;
    this.data_searchAttributes.forEach(opt => {
      this.dataToSearch.set(opt.key+'__contains',opt.value)
    });
    this.headerService.setDataSearch(Object.fromEntries(this.dataToSearch));
  }


  displaySearchAttributes(e:any){
    e.stopPropagation();
    if(!this.edit_mode){
      this.aux_data_searchAttributes.push({'key':this.searchAttributes[0], 'value': '', 'show': false});
      this.data_searchAttributes.push({'key':this.searchAttributes[0], 'value': '', 'show': false});
      this.show_searchAttributes = !this.show_searchAttributes;
      this.edit_mode = true;
    }
  }

  //Change last option to current mouse position
  mouseEnter(option:string){
    this.data_searchAttributes[this.data_searchAttributes.length-1].key = option;
  }
  
  mouseLeave(){
    if(!this.edit_mode){
      this.data_searchAttributes =  JSON.parse(JSON.stringify(this.aux_data_searchAttributes));
    }
  }

  setAttributes(option: string){
    this.data_searchAttributes[this.data_searchAttributes.length-1].key = option;
    this.aux_data_searchAttributes[this.data_searchAttributes.length-1].key = option;
    this.show_searchAttributes = !this.show_searchAttributes;
    this.searchAttributes = this.searchAttributes.filter((opt: string)=>opt!=option)    
  }

  onFocus(){
    this.show_searchAttributes = false;
  }

  stopProp(e:any){
    e.stopPropagation();
  }

  deleteOption(e:any, key:any){
    e.stopPropagation();
    this.data_searchAttributes = this.data_searchAttributes.filter(opt => opt.key != key)    
    this.searchAttributes.push(key)
    this.dataToSearch.delete(key+'__contains')
    this.headerService.setDataSearch(Object.fromEntries(this.dataToSearch));
  }

  //Change View Action
  changeToTableView(){ this.headerService.sendOutAction({action:'view', type:'table'}) }
  changeToCardView(){ this.headerService.sendOutAction({action:'view', type:'card'}) }
 
}
