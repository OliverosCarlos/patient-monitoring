import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
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

  formGroup: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private router : Router,
    private securityService: SecurityService,
    private backendService : BackendService,
    private utilService : UtilService
  ) {
    this.formGroup = this.fb.group({
      username: new UntypedFormControl('', [Validators.required, Validators.maxLength(250)]),
      password: new UntypedFormControl('', [Validators.required, Validators.maxLength(250)])
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
