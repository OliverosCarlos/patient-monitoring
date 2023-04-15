import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

import { AdDirective } from 'src/app/utils/components/ad.directive';
import { AdItem } from 'src/app/utils/components/ad-item';
import { AdComponent } from 'src/app/utils/components/ad.component';
import { AdService } from 'src/app/services/ad.service';

//MODELS 
import { Cmp, Model } from 'src/app/models/vw-model.model';
import { EventComponent } from 'src/app/models/event_component.model';

//SETUPS
import { MODELS } from 'src/app/utils/setup/model.setup';
//SERVICES
import { HeaderService } from 'src/app/services/header.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  suscribeHeaderService!: Subscription;
  suscribeHeaderAction!: Subscription;

  titulo = 'carlos'

  //labels
  labelMainButton = 'Crear';

  //flags
  showCreate = false; disabledCreate = false;
  showSave = false; disabledSave = false;
  showUpdate = false; disabledUpdate = false;
  showEdit = false; disabledEdit = false;
  showCancel = false;
  searchFlag = false;

  //view options
  showMultipleViewOption = false;
  showSingleOptions = false;
  showTableView = false;
  showCardView = false;

  formReady = false;

  //vars
  mainRoute = ''
  current_type = ''

  ads: AdItem[] = [];

  optionFunctions: any[] = [];

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  constructor(
    private headerService : HeaderService,
    private adService: AdService
    ) {}

  ngOnInit() {
    this.suscribeHeaderService = this.headerService.getHeader().subscribe(data => {
      this.startSetup(MODELS.filter(x=>x.name==data.name)[0], data.type);
    });
    this.suscribeHeaderAction = this.headerService.getInAction().subscribe(data => {
      this.startAction(data);
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy() {
  }

  startAction(event:EventComponent){
    switch (event.action) {
      case 'form':
        if(event.type == 'ready'){
          this.disabledSave = false;
        }
        if(event.type == 'not-ready'){
          this.disabledSave = true;
        }
        break;
      case 'update':
        if(event.type == 'ready'){
          this.disabledUpdate = false;
        }
        if(event.type == 'not-ready'){
          this.disabledUpdate = true;
        }
        break;
    
      default:
        break;
    }
  }

  save(){ this.headerService.sendOutAction({action:'save'}); }
  edit(){ this.headerService.sendOutAction({action:'edit'}); }
  update(){ this.headerService.sendOutAction({action:'update'}); }
  cancel(){ this.headerService.sendOutAction({action:'cancel'}); }

  //Change View Action
  changeToTableView(){ this.headerService.sendOutAction({action:'view', type:'table'}) }
  changeToCardView(){ this.headerService.sendOutAction({action:'view', type:'card'}) }

  delete(){
    this.headerService.sendOutAction({action: 'delete', type: 'list'});
  }

  updateOptionBar(){

  }

  updateBaseCRUD(){

  }

  startSetup(model:Model, type: string){
    switch (type) {
      case 'form':
        this.showCreate = false;
        this.showSave = true; this.disabledSave = true;
        this.showEdit = false;
        this.showUpdate = false;
        this.showCancel = true;
        this.searchFlag = false;
        this.showMultipleViewOption = false;
        this.showSingleOptions = false;
        break;
      case 'edit':
        this.showCreate = false;
        this.showSave = false; 
        this.showEdit = false;
        this.showUpdate = true; this.disabledUpdate = true;
        this.showCancel = true;
        this.searchFlag = false;
        this.showMultipleViewOption = false;
        this.showSingleOptions = false;
        break;
      case 'list':
        this.showCreate = true;
        this.showSave = false; this.disabledSave = false;
        this.showEdit = false;
        this.showUpdate = false;
        this.showCancel = false;
        this.searchFlag = true;
        this.mainRoute = model.components.filter(x=>x.view_type=='form')[0].route;
        this.showMultipleViewOption = model.multipleView;
        this.showSingleOptions = false;
        break;
      case 'show':
        this.searchFlag = false;
        this.showCreate = false;
        this.showSave = false;
        this.showEdit = true;
        this.showUpdate = false;
        this.showCancel = false;
        this.showMultipleViewOption = false;
        this.showSingleOptions = model.options.length > 0? true: false;
        this.setupOptions(model)
        break;
      default:
        break;
    }
  }

  config(){
    this.headerService.sendOutAction({action: 'config', type: 'assignment'});
  }
  
  setupOptions(model: Model){
    this.optionFunctions = [];
    model.options?.forEach(option => {
      this.optionFunctions.push(
        {
          fun:(obj:any)=>{
            this.headerService.sendOutAction({action: obj.action, type: obj.type});
          },
          icon: option.icon,
          data: {action:'option', type: option.name}
        }
      )
    });
  }

  loadComponent(adItem: Cmp) {
    // const viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();

    // const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
    // componentRef.instance.data = adItem.data;
  }

  transition(){

  }

}
