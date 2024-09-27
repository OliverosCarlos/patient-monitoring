import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ActivatedRoute, Router } from '@angular/router';

//SERVICES
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-side_nav_header_menu',
  templateUrl: './side_nav_header_menu.component.html',
  styleUrls: ['./side_nav_header_menu.component.scss'],
})
export class SideNavHeaderMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() menuItems: any;

  constructor(
    private securityService: SecurityService,
    private router : Router,
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
  }

  // goTo(){
  //   this.router.navigate(['main', 'clinical-history', 'early-stimulation','list']);
  // }


}
