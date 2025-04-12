import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

import { AdDirective } from 'src/app/utils/components/ad.directive';
import { AdItem } from 'src/app/utils/components/ad-item';
import { AdComponent } from 'src/app/utils/components/ad.component';
import { AdService } from 'src/app/services/ad.service';

//MODELS 
import { Cmp, Model, AbstractButton } from 'src/app/models/vw-model.model';
import { EventComponent } from 'src/app/models/event_component.model';

//SETUPS
import { MODELS } from 'src/app/utils/setup/model.setup';
//SERVICES
import { HeaderService } from 'src/app/services/header.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() sideNavHeaderMenuItems: any[] = [];

  suscribeHeaderService!: Subscription;
  suscribeHeaderAction!: Subscription;
  $platformService!: Subscription;

  titulo = 'carlos'
  platformTitle = '';
  platformSubtitle = '';
  isDashboard = false;

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
  menuOptionsList: any[] = [''];
  activities: any[] = [];
  // sideNavHeaderMenuItems : any[]= [];

  searchAttributes : any[] = []

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private headerService : HeaderService,
    private adService: AdService,
    private utilService : UtilService,
    ) {
      this.suscribeHeaderAction = this.headerService.getInAction().subscribe(data => {
        this.startAction(data);
      });
  
      this.suscribeHeaderService = this.headerService.getHeader().subscribe(data => {
        this.resetHeaderSetup();
        this.startSetup(data.model, data.type);
      });
    }

  ngOnInit() {
    console.log("HEADER");
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy() {
    this.suscribeHeaderAction.unsubscribe()
    this.suscribeHeaderService.unsubscribe()
    // this.$platformService.unsubscribe()
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

  create(){ this.router.navigate([this.mainRoute], { relativeTo: this.route });}
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

  export(){
    this.headerService.sendOutAction({action: 'exportPDF', type: 'list'});
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
        console.log("LIST LKJASLF");
        
        this.showCreate = true;
        this.showSave = false; this.disabledSave = false;
        this.showEdit = false;
        this.showUpdate = false;
        this.showCancel = false;
        this.searchFlag = true;
        this.mainRoute = model.components.filter(x=>x.view_type=='form')[0].route;
        this.showMultipleViewOption = model.multipleView;
        this.showSingleOptions = false;
        this.searchAttributes = model.searchAttributes!
        break;
      case 'show':
        this.searchFlag = false;
        this.showCreate = false;
        this.showSave = false;
        this.showEdit = true;
        this.showUpdate = false;
        this.showCancel = false;
        this.showMultipleViewOption = false;
        this.showSingleOptions = model.options? true: false;
        this.setupMenuOptions(model)
        this.setupActivities(model.activities)
        break;
      default:
        break;
    }
  }

  config(){
    this.headerService.sendOutAction({action: 'config', type: 'assignment'});
  }
  
  setupMenuOptions(model: Model){
    this.menuOptionsList = [];
    model.options?.forEach((option:string) => {
      this.menuOptionsList.push({menuOptionName: option, action: 'handle_'+option.toLowerCase().split(' ').join('_')})
    });
  }

  execute(action: string){
    this.headerService.sendOutAction({action});
  }

  setupActivities(activities: AbstractButton[] | undefined){
    if(activities){
      this.activities = []
      activities.forEach((activity:AbstractButton) => {
        this.activities.push(
          {
            name: activity.display_name,
            action: 'handle_'+activity.name,
            icon: activity.icon,
            tooltip: activity.tooltip,
            disabled: activity.disabled
          }
        )
      })
    }
  }

  setSearchAttributes(attributes: any){
    this.headerService.setDataSearch(attributes);
  }

  resetHeaderSetup(){
    this.headerService.setSetupSearch({action:"hardReset"})
  }
}
