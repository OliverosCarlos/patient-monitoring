import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormArray, UntypedFormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

//SERVICES
import { TaskService } from 'src/app/services/psychotherapy/task.service';
import { HeaderService } from 'src/app/services/header.service';
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

@Component({
  selector: 'app-task_assigned_application-form-view',
  templateUrl: './task_assigned_application-form-view.component.html',
  styleUrls: ['./task_assigned_application-form-view.component.scss']
})
export class TaskAssignedApplicationFormViewComponent implements OnInit {

  assignedTaskList = [{'na':''}]
  formGroup: UntypedFormGroup;

  disabledSend = true;
  patient_task_id :any ='';

  $headerAction!: Subscription;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    public fb: UntypedFormBuilder,
    private headerService : HeaderService,
    private backendService : BackendService,
    private utilService: UtilService
  ) {
    
    if(this.route.snapshot.paramMap.get('patient_task_id')){
      this.patient_task_id=this.route.snapshot.paramMap.get('patient_task_id')
    }
    if(this.route.snapshot.paramMap.get('task_template_id')){
      this.getTaskTemplateById(this.route.snapshot.paramMap.get('task_template_id'));
    }
    
    this.formGroup = this.fb.group({
      emotions : this.fb.array([
        this.fb.group({
          value: this.fb.control(false),
        })
      ])
    })
  }

  setupForm(data:any, fb: UntypedFormBuilder){
    this.formGroup = this.fb.group({
      patient_template: this.fb.control(this.route.snapshot.paramMap.get('patient_task_id'), [Validators.required]),
      emotions: this.fb.array(
        data[0].task_template_configuration.map(function(item:any){
          return fb.group({
            template_configuration: fb.control(item.id),
            emotion: fb.control(item.emotion),
            emotion_name: fb.control(item.emotion_name),
            value: fb.control(null,[Validators.required]),
          })
        })
      )
    })

    this.formGroup.statusChanges
    .pipe(
      filter(() => this.formGroup.valid))
    .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
    .pipe(
      filter(() => this.formGroup.invalid))
    .subscribe(() => this.onFormInvalid());
  }

  get emotions() {
    return this.formGroup.get('emotions') as UntypedFormArray;
  }

  getItemForm(item:any){
    console.log(this.fb);
  }

  ngOnInit(): void {
    this.headerService.setHeader({name:'task',type:'form'});
    this.utilService.set({name:'task', type:'form'});
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

  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'form', type: 'not-ready'});
  }


  save(){
    this.backendService.create(PSYCHOTHERAPY.TASK_APPLICATION, this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => console.log('COMPLETE')      
    })
  }

  cancel(){

  }

  getTaskTemplateById(id:any){
    if(id){
      this.taskService.getTaskTemplateById(id).subscribe({
        next: (v) => { this.setupForm(v,this.fb)},
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  buildTaskApplication(tt:any){

  }
}
