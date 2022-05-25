import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

//SERVICES
import { EmotionsService } from 'src/app/services/catalogs/emotions.service';
import { TaskService } from 'src/app/services/psychotherapy/task.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//models

@Component({
  selector: 'app-task_template-show-view',
  templateUrl: './task_template-show-view.component.html',
  styleUrls: ['./task_template-show-view.component.scss']
})
export class TaskTemplateShowViewComponent implements OnInit, OnDestroy, AfterViewInit {

  emotion = { 
    id: '', 
    code: '',
    name: '',
    description: '',
    color: ''
  };

  $headerAction!: Subscription;

  constructor(
    private emotionsService: EmotionsService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router : Router,
    private headerService : HeaderService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.headerService.setHeader({name:'task',type:'show'});
    this.utilService.set({name:'task', type:'show'});
    if(this.route.snapshot.paramMap.get('task_template_id')){
      this.getTaskTemplateById(this.route.snapshot.paramMap.get('task_template_id'));
    }
  }
  
  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'edit':
          this.edit();
          break;
      
        default:
          break;
      }
    });
  }

  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  getTaskTemplateById(id:any){
    if(id){
      this.taskService.getTaskTemplateById(id).subscribe({
        // next: (v) => { this.emotion = v[0] },
        next: (v) => { console.log(v[0]) },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  edit(){
    this.router.navigate(['catalogs','emotions','update',this.route.snapshot.paramMap.get('emotion_id')]);
  }

}
