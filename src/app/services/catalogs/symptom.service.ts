import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SymptomService {
readonly APIUrl = "http://127.0.0.1:8000";
readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http:HttpClient) { }

  getSymptomList():Observable<any>{
    return this.http.get(this.APIUrl + '/symptom/')
  }

  getSymptomById(id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/symptom/${id}`);
  }

  addSymptom(val:any){
    return this.http.post(this.APIUrl + '/symptom/',val);
  }

  updateSymptom(val:any){
    return this.http.put(this.APIUrl + '/symptom/',val);
  }

  deleteSymptom(val:any){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: val
    };
    return this.http.delete(this.APIUrl + '/symptom/',httpOptions);
  }
}