import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PsychologistService {
readonly APIUrl = "http://127.0.0.1:8000";
readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http:HttpClient) { }

  getPsychologistsList():Observable<any>{
    return this.http.get(this.APIUrl + '/psychologist/')
  }

  getPsychologistById(id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/psychologist/${id}`);
  }

  addPsychologist(val:any){
    return this.http.post(this.APIUrl + '/psychologist/',val);
  }

  updatePsychologist(val:any){
    return this.http.put(this.APIUrl + '/psychologist/',val);
  }

  deletePsychologists(val:any){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: val
    };
    return this.http.delete(this.APIUrl + '/psychologist/',httpOptions);
  }


  updateDepartment(val:any){
    return this.http.put(this.APIUrl + '/department/',val);
  }

  deleteDepartment(val:any){
    return this.http.delete(this.APIUrl + '/department/'+val);
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/department/');
  }

  getTst():Observable<any>{
    return this.http.get(this.APIUrl + '/tst/')
  }
}