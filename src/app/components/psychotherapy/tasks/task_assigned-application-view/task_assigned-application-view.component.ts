import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

//SERVICES
import { TaskService } from 'src/app/services/psychotherapy/task.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-task_assigned-application-view',
  templateUrl: './task_assigned-application-view.component.html',
  styleUrls: ['./task_assigned-application-view.component.scss']
})
export class TaskAssignedApplicationViewComponent implements OnInit {

  assignedTaskList = [{'na':''}]
  formGroup: FormGroup;

  disabledSend = true;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    public fb: FormBuilder
  ) {
    if(this.route.snapshot.paramMap.get('task_template_id')){
      this.getTaskTemplateById(this.route.snapshot.paramMap.get('task_template_id'));
    }
    this.formGroup = this.fb.group({
      emotions : this.fb.array([
        this.fb.group({
          level: this.fb.control(false),
        })
      ])
    })
  }

  setupForm(data:any, fb: FormBuilder){
    this.formGroup = this.fb.group({
      patient: this.fb.control(1, [Validators.required]),
      emotions: this.fb.array(
        data[0].task_template_configuration.map(function(item:any){
          return fb.group({
            emotion: fb.control(item.emotion),
            emotion_name: fb.control(item.emotion_name),
            level: fb.control(null,[Validators.required]),
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
    return this.formGroup.get('emotions') as FormArray;
  }

  getItemForm(item:any){
    console.log(this.fb);
  }

  ngOnInit(): void {
  }

  onFormValid() {
    this.disabledSend = false;
  }

  onFormInvalid() {
    this.disabledSend = true;
  }

  send(){
    console.log(this.formGroup.value);
    

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
