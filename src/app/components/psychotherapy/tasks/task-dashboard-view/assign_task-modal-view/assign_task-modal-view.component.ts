import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

//SERVICES
import { TaskService } from 'src/app/services/psychotherapy/task.service';
import { EventService } from 'src/app/utils/services/event.service';


import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-assign_task-modal-view',
  templateUrl: './assign_task-modal-view.component.html',
  styleUrls: ['./assign_task-modal-view.component.scss']
})
export class AssignTaskModalViewComponent implements OnInit {

  task_template_list = []

  formGroup: UntypedFormGroup;

  $headerAction!: Subscription;

  constructor(
    private taskService: TaskService,
    private fb: UntypedFormBuilder,
    private eventService: EventService
  ) { 
    this.formGroup = this.fb.group({
      task_template: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
    });
  }

  ngOnInit(): void {
    this.formGroup.statusChanges
    .pipe(
      filter(() => this.formGroup.valid))
    .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
    .pipe(
      filter(() => this.formGroup.invalid))
    .subscribe(() => this.onFormInvalid());

    this.getAllTaskTemplates();
  }

  onFormValid() {
    this.eventService.sendInAction({type:'form', action:'completed', body: this.formGroup.value});

  }

  onFormInvalid() {
  }

  getAllTaskTemplates(){
    this.taskService.getTaskTemplateList().subscribe({
      next: (v) => { this.task_template_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
