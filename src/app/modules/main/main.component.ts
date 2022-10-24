import { ViewChild, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { ChildrenOutletContexts, Router } from '@angular/router';

import { UtilService } from 'src/app/services/util.service';
import { SecurityService } from 'src/app/services/security.service';

import { slideInAnimation } from 'src/app/utils/animations/routeAnimation';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class MainComponent implements OnInit {
  title = 'patient-monitoring';
  events: string[] = [];
  opened: boolean = false;

  $platformService!: Subscription;
  $perfilService!: Subscription;

  username = '';
  platformTitle = '';
  platformSubtitle = '';

  constructor(
    private utilService : UtilService,
    private securityService : SecurityService,
    private router : Router,
    private contexts: ChildrenOutletContexts
    ) {}

  ngOnInit(): void {
    this.$platformService = this.utilService.get().subscribe(data => {
      this.platformTitle = data.title;
      this.platformSubtitle = data.subtitle;
    });

    this.$perfilService = this.utilService.getPerfil().subscribe(username => {
      this.username = username;
    });
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
}
