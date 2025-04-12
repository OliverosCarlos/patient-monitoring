import { Component, OnInit, OnDestroy, Input, AfterViewInit, TemplateRef } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ActivatedRoute, Router, ChildrenOutletContexts } from '@angular/router';

import { Subscription } from 'rxjs';

//SERVICES
import { SecurityService } from 'src/app/services/security.service';
import { slideInAnimation } from 'src/app/utils/animations/routeAnimation';
import { UtilService } from 'src/app/services/util.service';
import { SetupService } from 'src/app/utils/services/setup.service';

@Component({
  selector: 'app-main_viewer',
  templateUrl: './main_viewer.component.html',
  styleUrls: ['./main_viewer.component.scss'],
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
export class MainViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'patient-monitoring';

  $platformService!: Subscription;
  $setup!: Subscription;
  $viewType!: Subscription;


  events: string[] = [];
  opened: boolean = false;
  auxCurrentState : boolean = false;

  username = '';
  platformTitle = '';
  platformSubtitle = '';
  isDashboard = false;
  content_type : TemplateRef<any> | undefined;
  data_menu: any[] = []

  constructor(
    private securityService: SecurityService,
    private router : Router,
    private contexts: ChildrenOutletContexts,
    private utilService : UtilService,
    private setupService : SetupService,
  ) {
    this.$setup = this.setupService.getModule().subscribe(data => {
      console.log("MAIN VIEWER", data);
      
      this.data_menu = data.menus!;
    });
    this.$viewType = this.setupService.getViewType().subscribe(view_type => {
      switch (view_type) {
           case 'dashboard_content': 
             this.isDashboard = true;
             break;
           case 'card_content':
             this.isDashboard = false;
             break;
           default:
             this.isDashboard = false;
             break;
      }
    });
    
  }

  ngOnInit() {
    this.$platformService = this.utilService.get().subscribe(data => {
      switch (data.content_type) {
        case 'dashboard_content': 
          this.isDashboard = true;
          break;
        case 'card_content':
          this.isDashboard = false;
          break;
        default:
          this.isDashboard = false;
          break;
      }
      
      this.platformTitle = data.title;
      this.platformSubtitle = data.subtitle;
      // this.data_menu = data.menus;
    });


  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    // this.$platformService.unsubscribe()
    this.$setup.unsubscribe()
    this.$viewType.unsubscribe()    
  }

  // goTo(){
  //   this.router.navigate(['main', 'clinical-history', 'early-stimulation','list']);
  // }
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
