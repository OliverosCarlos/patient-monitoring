import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AutoFocus } from './autofocus.directive';

//MODELS 
import { AdvanceSearch } from 'src/app/models/advance_search.model';
//SETUPS
import { MODELS } from 'src/app/utils/setup/model.setup';
//SERVICES
import { HeaderService } from 'src/app/services/header.service';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-advance-search',
  templateUrl: './advance_search.component.html',
  styleUrls: ['./advance_search.component.scss']
})
export class AdvanceSearchComponent implements OnInit, OnDestroy, AfterViewInit {

  private _searchAttributes: any[] = [];   
  @Input()
  set searchAttributes(value: any) {
     this._searchAttributes = value;
     this.reset()
     if(value.length == 0){
      this._data_searchAttributes.next([])
     }
  }  
  get searchAttributes(): any { return this._searchAttributes; }

  @Output() eventDataSearch = new EventEmitter<any>();

  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @ViewChild('searchAttributesPanel') searchAttributesPanel!: ElementRef;
  
  aux_searchAttributes = []
  // data_searchAttributes: AdvanceSearch[] = [];
  aux_data_searchAttributes: AdvanceSearch[] = [];
  edit_mode = false;

  dataToSearch = new Map<string, string>()

  private _data_searchAttributes: BehaviorSubject<AdvanceSearch[]> = new BehaviorSubject<AdvanceSearch[]>([]);
  public data_searchAttributes$: Observable<AdvanceSearch[]> = this._data_searchAttributes.asObservable();

  private _show_searchAttributes: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public show_searchAttributes$: Observable<boolean> = this._show_searchAttributes.asObservable();

  showMultipleViewOption = false;

  $advanceSearch!: Subscription;
  private clickListener: () => void;

  constructor(
    private headerService : HeaderService,
    private renderer: Renderer2
  ) {
    this.clickListener = this.renderer.listen('window', 'click',(e:Event)=>{
      if(e.target !== this.searchContainer.nativeElement && e.target !== this.searchAttributesPanel.nativeElement){
        console.log("Clicked outside");
        this._show_searchAttributes.next(false)
    }
    })
  }

  ngOnInit() {
    this.reset()
  }

  ngAfterViewInit(): void {
    this.$advanceSearch! = this.headerService.getSetupSearch().subscribe(data => {
      if(data.action == "hardReset"){
        this._data_searchAttributes.next([])
      }
    });
  }

  reset(){
    this.edit_mode = false;
    this._show_searchAttributes.next(false)
    this.dataToSearch.clear();
  }



  ngOnDestroy() {
    this.$advanceSearch!.unsubscribe();
    if (this.clickListener) {
      this.clickListener();
    }
  }

  attributeActivated(e:any,id:string){
    e.stopPropagation();
    this._data_searchAttributes.next(
      this._data_searchAttributes.getValue().map(opt => (
        opt.key == id ?
          {'key':opt.key, 'value': opt.value, 'show': false} :
          {'key':opt.key, 'value': opt.value, 'show': true}
      ))
    )
  }

  inputSetVal(event: any){
    let id = event.target.id.split('-')[1]
    if(event.target.value == ''){
      this._data_searchAttributes.next(this._data_searchAttributes.getValue().filter( opt => opt.key != id))
    }else{
      this._data_searchAttributes.next(
        this._data_searchAttributes.getValue().map(opt => (
          opt.key == id ? 
          {'key':id, 'value': event.target.value, 'show': true} :
          {'key':opt.key, 'value': opt.value, 'show': true}
          ) )
      )
    }
    this.edit_mode = false;
    this._data_searchAttributes.getValue().forEach(opt => {
      this.dataToSearch.set(opt.key+'__contains',opt.value)
    });
    this.eventDataSearch.emit(Object.fromEntries(this.dataToSearch))
  }


  displaySearchAttributes(e:any){
    e.stopPropagation();
    if(!this.edit_mode){
      this.aux_data_searchAttributes.push({'key':this.searchAttributes[0], 'value': '', 'show': false});
      this._data_searchAttributes.next(
        //Using spread sep
        [...this._data_searchAttributes.getValue(), {'key':this.searchAttributes[0], 'value': '', 'show': false}]
      )
      this._show_searchAttributes.next(true)
      this.edit_mode = true;
    }
  }

  //Change last Search Attribute Option to current mouse position
  mouseEnter(option:string){
    let auxArray = this._data_searchAttributes.getValue()
    //Change last array item
    auxArray[auxArray.length-1].key = option;
    this._data_searchAttributes.next(auxArray)
  }
  
  mouseLeave(){
    if(!this.edit_mode){
      this._data_searchAttributes.next(JSON.parse(JSON.stringify(this.aux_data_searchAttributes)))
    }
  }

  setAttributes(option: string){
    this.searchAttributes = this.searchAttributes.filter((opt: string)=>opt!=option) 
    let auxArray = this._data_searchAttributes.getValue()
    auxArray[auxArray.length-1].key = option;
    
    this._data_searchAttributes.next(auxArray)
    this.aux_data_searchAttributes[auxArray.length-1].key = option;
    // this._show_searchAttributes.next(false)
       
  }

  onFocus(){
    // this.show_searchAttributes = false;
  }

  stopProp(e:any){
    e.stopPropagation();
  }

  deleteOption(e:any, key:any){
    e.stopPropagation();
    this._data_searchAttributes.next(this._data_searchAttributes.getValue().filter(opt => opt.key != key))
    this.searchAttributes.push(key)
    this.dataToSearch.delete(key+'__contains')
    this.eventDataSearch.emit(Object.fromEntries(this.dataToSearch))
  }

  handleLostfocus(event:any){
    console.log("FOCUS LOST");
    
  }
}
