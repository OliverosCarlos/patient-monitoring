import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ActivatedRoute, Router } from '@angular/router';

//SERVICES
import { SecurityService } from 'src/app/services/security.service';

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

  profile = {
    user: {
      first_name : "",
      last_name : "",
      email : ""
    },
    psychologist:{
      image : ""
    }


  }

  constructor(
    private securityService: SecurityService,
    private router : Router,
  ) {}

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile')!);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
  }

  logout(){
    this.securityService.logout().subscribe({
      next: (v) => { 
        
       
        
        this.router.navigate(['login']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    }
      // result => {
      //   console.log("LOGOUT ===================>");
      //   console.log(result);
        
      //   if(result.status == 200){
      //     this.router.navigate(['login']);
      //   }else{
      //     console.log("ERROR!");
          
      //   }
      // }
    )
  }

  display(){
    this.showPerfilMenu = !this.showPerfilMenu;
  }

  getProfileImage(data: any){
    if(data.psychologist){
      return './assets/media/'+data.psychologist.image
    }
    else{
      return './assets/media/admin_user.png'
    }
  }
}
