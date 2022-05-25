import { Component, OnInit } from '@angular/core';

//SERVICES
import { TaskService } from 'src/app/services/psychotherapy/task.service';

@Component({
  selector: 'app-task-dashboard-view',
  templateUrl: './task-dashboard-view.component.html',
  styleUrls: ['./task-dashboard-view.component.scss']
})
export class TaskDashboardViewComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  task_template_list = [{id:'',name:''}]

  constructor(
    private taskService: TaskService
  ) { 

  }

  ngOnInit(): void {
    this.getAllTaskTemplates();
  }

  getAllTaskTemplates(){
    this.taskService.getTaskTemplateList().subscribe({
      next: (v) => { this.task_template_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
