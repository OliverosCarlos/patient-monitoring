import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Functionality_analysisService {
readonly APIUrl = "http://127.0.0.1:8000";
readonly PhotoUrl = "http://127.0.0.1:8000/media/";

private data = new Subject<any>();

  constructor(private http:HttpClient) { }

  getFunctionality_analysisList():Observable<any>{
    return this.http.get(this.APIUrl + '/functionality_analysis/')
  }

  getFunctionality_analysisById(id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/functionality_analysis/${id}`);
  }

  addFunctionality_analysis(val:any){
    return this.http.post(this.APIUrl + '/functionality_analysis/',val);
  }

  updateFunctionality_analysis(val:any){
    return this.http.put(this.APIUrl + '/functionality_analysis/',val);
  }

  deleteFunctionality_analysis(val:any){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: val
    };
    return this.http.delete(this.APIUrl + '/functionality_analysis/',httpOptions);
  }

  

  public set(data:any) {
    this.data.next(data);
  }

  public get(): Observable<any> {
    return this.data.asObservable();
  }
}