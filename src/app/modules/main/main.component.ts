import { ViewChild, OnInit, TemplateRef, AfterViewInit, Input, AfterViewChecked} from '@angular/core';
import { Component, ChangeDetectorRef  } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from "@angular/animations";

import { UtilService } from 'src/app/services/util.service';
import { SecurityService } from 'src/app/services/security.service';

import { slideInAnimation } from 'src/app/utils/animations/routeAnimation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('navAnimation', [
      state('expand', style({width:"20%"})),
      state('contract', style({width:"4%"})),
      transition('expand=>contract', [animate('0.3s ease-in')]),
      transition('contract=>expand', [animate('0.3s ease-in')])
    ]),
    trigger('navContentAnimation', [
      state('expand', style({width:"80%"})),
      state('contract', style({width:"96%"})),
      transition('expand=>contract', [animate('0.3s ease-in')]),
      transition('contract=>expand', [animate('0.3s ease-in')])
    ]),
    slideInAnimation
  ]
})
export class MainComponent implements OnInit, AfterViewInit {
  title = 'patient-monitoring';
  events: string[] = [];
  opened: boolean = false;
  auxCurrentState : boolean = false;

  $platformService!: Subscription;
  $perfilService!: Subscription;

  username = '';
  platformTitle = '';
  platformSubtitle = '';

  @ViewChild('dashboard_content') dashboard_content!: TemplateRef<any>;
  @ViewChild('card_content') card_content!: TemplateRef<any>;
  @Input() currentState: String = "";

  sideNavHeaderMenuItems: string[] = []
  content_type : TemplateRef<any> | undefined;

  isDashboard = false;

  constructor(
    private utilService : UtilService,
    private securityService : SecurityService,
    private router : Router,
    private contexts: ChildrenOutletContexts,
    private changeDetectorRef : ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.$platformService = this.utilService.get().subscribe(data => {
      switch (data.content_type) {
        case 'dashboard_content': 
          this.content_type = this.dashboard_content;
          this.isDashboard = true;
          break;
        case 'card_content':
          this.content_type = this.card_content;
          this.isDashboard = false;
          break;
        default:
          this.content_type = this.dashboard_content;
          this.isDashboard = false;
          break;
      }
      
      this.platformTitle = data.title;
      this.platformSubtitle = data.subtitle;
      this.sideNavHeaderMenuItems = data.menus;
    });
    this.$perfilService = this.utilService.getPerfil().subscribe(username => {
      this.username = username;
    });
  }

  ngAfterViewInit(): void {}

  ngAfterViewChecked(): void{
    this.changeDetectorRef.detectChanges()
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  logout(){
    this.securityService.logout().subscribe({
      next: (v) => { this.router.navigate(['login']); },
      error: (e) => console.error(e),
      complete: () => console.log('completed')
    })
  }

  // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
  shouldRun = true;
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  changeNavState(){
    this.auxCurrentState = !this.auxCurrentState;
    if(this.auxCurrentState){
      this.currentState = "expand";
    }else{
      this.currentState = "contract";
    }
  }
}
