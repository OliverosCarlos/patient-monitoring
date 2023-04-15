import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
readonly APIUrl = "http://127.0.0.1:8000";
readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http:HttpClient) { }

  getTasksList():Observable<any>{
    return this.http.get(this.APIUrl + '/tasks/')
  }

  getTaskById(id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/tasks/${id}`);
  }

  addTask(val:any){
    return this.http.post(this.APIUrl + '/tasks/',val);
  }

  updateTask(val:any){
    return this.http.put(this.APIUrl + '/tasks/',val);
  }

  deleteTasks(val:any){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: val
    };
    return this.http.delete(this.APIUrl + '/tasks/',httpOptions);
  }

  getTaskTemplateList():Observable<any>{
    return this.http.get(this.APIUrl + '/task_templates/')
  }

  getTaskTemplateById(id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/task_templates/${id}`);
  }

  addTaskTemplate(val:any){
    return this.http.post(this.APIUrl + '/task_templates/',val);
  }

  assignTask(form:any){
    let data = {patient:form.patient,task_template:form.task_template}
    return this.http.post(this.APIUrl + '/task_assign/',data);
  }

  getAssignTaskById(patient_id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/task_assign/${patient_id}`);
  }

}