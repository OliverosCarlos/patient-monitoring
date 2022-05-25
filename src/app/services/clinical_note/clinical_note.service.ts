import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Clinical_notesService {
readonly APIUrl = "http://127.0.0.1:8000";
readonly PhotoUrl = "http://127.0.0.1:8000/media/";

private data = new Subject<any>();

  constructor(private http:HttpClient) { }

  getClinical_noteList():Observable<any>{
    return this.http.get(this.APIUrl + '/clinical_note/')
  }

  addClinical_note(val:any){
    return this.http.post(this.APIUrl + '/clinical_note/',val);
  }

  getClinical_noteById(id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/clinical_note/${id}`);
  }

}