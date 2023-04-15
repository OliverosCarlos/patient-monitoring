import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { GenericSnackbarComponent } from 'src/app/utils/components/generic_snackbar/generic_snackbar.component'; 

//SERVICES
import { TaskService } from 'src/app/services/psychotherapy/task.service';
import { EventService } from 'src/app/utils/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';



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
    private eventService: EventService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<AssignTaskModalViewComponent>
  ) {
    this.formGroup = this.fb.group({
      task_template: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
    });
  }

  ngOnInit(): void {
    console.log('DATA ID');
    console.log(this.data);
    
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

  assignTask(){
    this.taskService.assignTask({
      patient: this.data.id,
      task_template: this.formGroup.value.task_template
    }).subscribe({
      next: (v: any) => { 
        this.matDialogRef.close({status: 200});
        this.showSuccess();
      },
      error: (e: any) => console.error(e),
      complete: () => console.log('completed')//this.router.navigate(['psychotherapy','task','dashboard'])
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
