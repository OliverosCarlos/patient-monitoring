import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

//MODELS

//SERVICES
import { HeaderService } from 'src/app/services/header.service';

//SETUP
import { MENUS } from 'src/app/utils/setup/menu.setup';
import { MODELS } from 'src/app/utils/setup/model.setup'


@Component({
  selector: 'app-side_menu',
  templateUrl: './side_menu.component.html',
  styleUrls: ['./side_menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy, AfterViewInit {

  suscribeHeaderService!: Subscription;
  menu_list:any[] = [];

  constructor(
    private headerService : HeaderService
    ) {}

  ngAfterViewInit(): void {
    // this.suscribeHeaderService = this.headerService.get().subscribe(data => {
    //   console.log(data);
    //   this.startSetup(data);
    // });
  }

  ngOnInit() {
    this.menu_list = MENUS;
  }
  
  ngOnDestroy() {
  }

  deletePsychologists(){
  }
  
  changeComponent(name:string,type:string){
  }

  // startSetup(data:Cmp){
  //   switch (data.current_type) {
  //     case 'create':
        
  //       break;
  //     case 'update':
  //       this.setUpdating(data);
  //       break;
  //     case 'list':
  //       this.setListing(data);
  //       break;
  //     case 'show':
  //       this.setShowing(data);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // setCreating(cmp:Cmp){
  //   this.labelMainButton = 'Guardar';
  // }

  // setUpdating(cmp:Cmp){
  //   this.labelMainButton = 'Cancelar';
  // }

  // setListing(cmp:Cmp){
  //   this.labelMainButton = 'Crear';
  //   this.searchFlag = true;
  //   this.mainRoute = '/catalogs/emotions/form';
  // }

  // setShowing(cmp:Cmp){
  //   this.labelMainButton = 'Editar';
  //   this.searchFlag = false;
  // }

  // transition(){

  // }

  // [routerLink]="[mainRoute]"

}
