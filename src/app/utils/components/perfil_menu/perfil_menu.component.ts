import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

//MODELS 
import { AdvanceSearch } from 'src/app/models/advance_search.model';
//SETUPS
import { MODELS } from 'src/app/utils/setup/model.setup';
//SERVICES
import { HeaderService } from 'src/app/services/header.service';




@Component({
  selector: 'app-perfil_menu',
  templateUrl: './perfil_menu.component.html',
  styleUrls: ['./perfil_menu.component.scss'],
  animations: [
    trigger('perfilMenu', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('200ms', 
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('200ms', style({ opacity: 0, transform: 'translateX(100%)' }) )
      ])
    ])
  ]
})
export class PerfilMenuComponent implements OnInit, OnDestroy, AfterViewInit {

  showPerfilMenu : boolean = false;
  @Input() currentState: String = "";

  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
  }

  display(){
    this.showPerfilMenu = !this.showPerfilMenu;
  }
}
