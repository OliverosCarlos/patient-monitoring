import { Component, OnInit } from '@angular/core';

//SERVICES
import { TaskService } from 'src/app/services/psychotherapy/task.service';

@Component({
  selector: 'app-task-dashboard-view',
  templateUrl: './task-dashboard-view.component.html',
  styleUrls: ['./task-dashboard-view.component.scss']
})
export class TaskDashboardViewComponent implements OnInit {

  task_template_list = [{id:'',name:''}]

  constructor(
    private taskService: TaskService
  ) { 

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
    this.taskService.getTaskTemplateList().subscribe({
      next: (v) => { this.task_template_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}

