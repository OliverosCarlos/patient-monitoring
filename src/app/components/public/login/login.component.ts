import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SEC } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { SecurityService } from 'src/app/services/security.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private securityService: SecurityService,
    private backendService : BackendService,
    private utilService : UtilService
  ) {
    this.formGroup = this.fb.group({
      username: new FormControl('magali', [Validators.required, Validators.maxLength(250)]),
      password: new FormControl('qwer.1234', [Validators.required, Validators.maxLength(250)])
    });
  }

  ngAfterViewInit(): void {}

  ngOnInit() {}


  ngOnDestroy() {
  }

  login(){
    this.securityService.login(this.formGroup.value)
    .subscribe(
      result => {
        if(result.status == 200){
          this.router.navigate(['main']);
        }else{
          this.router.navigate(['login']);
        }
      }
    )
  }



}
