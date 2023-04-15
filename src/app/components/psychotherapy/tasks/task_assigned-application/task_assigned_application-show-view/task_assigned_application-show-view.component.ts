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
  selector: 'app-task_assigned_application-show-view',
  templateUrl: './task_assigned_application-show-view.component.html',
  styleUrls: ['./task_assigned_application-show-view.component.scss']
})
export class TaskAssignedApplicationShowViewComponent implements OnInit {

  patient_task_id :any ='';
  application : any[] = []

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
      this.getTaskApplicationByPatientTask(this.patient_task_id);
    }
  }

  ngOnInit(): void {
    this.headerService.setHeader({name:'task',type:'form'});
    this.utilService.set({name:'task', type:'form'});
  }

  getTaskApplicationByPatientTask(id:any){
    if(id){
      this.backendService.getOneById( PSYCHOTHERAPY.TASK_APPLICATION, this.patient_task_id ).subscribe({
        next: (v) => { 
          this.buildTaskApplication(v)
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  buildTaskApplication(data:any){
    this.application =  data.map(
      (task: any) => (
        {
          'emotion':task.emotion,
          'options': [1,2,3,4,5].map(opt => ({
            'name': 'level '+opt,
            'value':opt,
            'checked': task.value == opt? true : false
            })
          )
        }
      )
    )
  }
}
