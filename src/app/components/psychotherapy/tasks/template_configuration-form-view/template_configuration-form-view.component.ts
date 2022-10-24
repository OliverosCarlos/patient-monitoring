import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CATALOGS } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { TaskService } from 'src/app/services/psychotherapy/task.service';
import { BackendService } from 'src/app/services/backend.service'
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-template_configuration-form-view',
  templateUrl: './template_configuration-form-view.component.html',
  styleUrls: ['./template_configuration-form-view.component.scss']
})
export class TemplateConfigurationFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;

  emotion_list = [];
  selected_symptom = [];

  $headerAction!: Subscription;

  constructor(
    private taskService: TaskService,
    private backendService: BackendService,
    private router : Router,
    private route: ActivatedRoute,
    private headerService : HeaderService,
    private utilService: UtilService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      code: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      emotions: new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });
  }

  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'save':
          this.save();
          break;

        case 'cancel':
          this.cancel();
          break;

        default:
          break;
      }
    });
  }

  ngOnInit() {
    this.headerService.setHeader({name:'task', type:'form'});
    this.utilService.set({name:'task', type:'form'});
    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.valid))
      .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.invalid))
      .subscribe(() => this.onFormInvalid());
    this.getAllSymptom();
  }

  get paForm() { return this.formGroup.controls }
  
  ngOnDestroy() {
    this.$headerAction.unsubscribe();
  }

  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'form', type: 'not-ready'});
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
      }
    }
  }

  getAllSymptom(){
    this.backendService.getAll(CATALOGS.EMOTIONS).subscribe({
      next: (v) => { this.emotion_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  save(){
    this.taskService.addTaskTemplate(this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['psychotherapy','task','dashboard'])
    })
  }

  cancel(){
    this.router.navigate(['psychotherapy','task','dashboard']);
  }
}
