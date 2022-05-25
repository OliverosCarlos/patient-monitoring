import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmotionsService {
readonly APIUrl = "http://127.0.0.1:8000";
readonly PhotoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http:HttpClient) { }

  getEmotionsList():Observable<any>{
    return this.http.get(this.APIUrl + '/emotions/')
  }

  getEmotionById(id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/emotions/${id}`);
  }

  addEmotion(val:any){
    return this.http.post(this.APIUrl + '/emotions/',val);
  }

  updateEmotion(val:any){
    return this.http.put(this.APIUrl + '/emotions/',val);
  }

  deleteEmotions(val:any){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: val
    };
    return this.http.delete(this.APIUrl + '/emotions/',httpOptions);
  }
}