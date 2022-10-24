import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  readonly APIUrl = "http://127.0.0.1:8000";
  readonly APIMediaUrl = "http://127.0.0.1:8000/media/";

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'Authorization': 'Token ' + localStorage.getItem('token')
        })
  };

  constructor(private http:HttpClient,) { }


  getEmotionsList():Observable<any>{    
    return this.http.get(this.APIUrl + '/catalogs/emotions/',  this.httpOptions);
  }
  
  getEmotionById(id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/catalogs/emotions/${id}`,  this.httpOptions);
  }

  addEmotion(val:any){
    return this.http.post(this.APIUrl + '/catalogs/emotions/', val,  this.httpOptions);
  }

  updateEmotion(val:any){
    return this.http.put(this.APIUrl + '/catalogs/emotions/', val,  this.httpOptions);
  }

  deleteEmotions(val:any){
    return this.http.delete(this.APIUrl + '/catalogs/emotions/',  this.httpOptions);
  }
}