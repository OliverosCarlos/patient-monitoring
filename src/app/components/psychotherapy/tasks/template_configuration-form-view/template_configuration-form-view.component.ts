import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CATALOGS } from 'src/app/utils/setup/routes.enum';
import { GenericSnackbarComponent } from 'src/app/utils/components/generic_snackbar/generic_snackbar.component'; 

//SERVICES
import { TaskService } from 'src/app/services/psychotherapy/task.service';
import { BackendService } from 'src/app/services/backend.service'
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-template_configuration-form-view',
  templateUrl: './template_configuration-form-view.component.html',
  styleUrls: ['./template_configuration-form-view.component.scss']
})
export class TemplateConfigurationFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: UntypedFormGroup;
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
    private fb: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<TemplateConfigurationFormViewComponent>
  ) {
    this.formGroup = this.fb.group({
      name: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      description: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      code: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      emotions: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)])
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.headerService.setHeader({name:'task', type:'form'});
    this.utilService.set({name:'task', type:'form'});
    // this.formGroup.statusChanges
    //   .pipe(
    //     filter(() => this.formGroup.valid))
    //   .subscribe(() => this.onFormValid());

    // this.formGroup.statusChanges
    //   .pipe(
    //     filter(() => this.formGroup.invalid))
    //   .subscribe(() => this.onFormInvalid());
    this.getAllSymptom();
  }
  
  ngOnDestroy() {
  }

  getAllSymptom(){
    this.backendService.getAll(CATALOGS.EMOTIONS,{}).subscribe({
      next: (v) => { this.emotion_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  save(){
    this.taskService.addTaskTemplate(this.formGroup.value).subscribe({
      next: (v) => {
        console.log('ANSWER ============>');
        
        console.log(v);
        
        this.matDialogRef.close({status: 200}); 
        this.showSuccess(); 
      },
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['psychotherapy','task','dashboard'])
    })
  }

  showSuccess(){
    this._snackBar.openFromComponent(GenericSnackbarComponent, {
      data: {
        message: "Tarea creada correctamente",
        icon: "done"
      },
      duration: 5000
    });
  }

}
