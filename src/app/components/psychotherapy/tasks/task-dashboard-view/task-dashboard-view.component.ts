import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { TaskService } from 'src/app/services/psychotherapy/task.service';
import { UtilService } from 'src/app/services/util.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-task-dashboard-view',
  templateUrl: './task-dashboard-view.component.html',
  styleUrls: ['./task-dashboard-view.component.scss']
})
export class TaskDashboardViewComponent implements OnInit, AfterViewInit {

  task_template_list = [{id:'',name:''}]

  constructor(
    private taskService: TaskService,
    private utilService: UtilService,
    private backendService : BackendService,
  ) { 

  }

  ngAfterViewInit(): void {
    this.utilService.set({name:'task', type:'dashboard'});
  }

  ngOnInit(): void {
    this.getAllTaskTemplates();
    if(localStorage.getItem('id')){
      this.taskService.getAssignTaskById(localStorage.getItem('id')!).subscribe({
        next: (v) => { },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  getAllTaskTemplates(){
    this.backendService.getAll(PSYCHOTHERAPY.TASK_TEMPLATE,{}).subscribe({
      next: (v) => { this.task_template_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}

