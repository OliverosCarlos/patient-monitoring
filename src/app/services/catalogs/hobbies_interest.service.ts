import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HobbiesInterestService {
readonly APIUrl = "http://143.244.213.215:8000";
readonly PhotoUrl = "http://143.244.213.215:8000/media/";

  constructor(private http:HttpClient) { }

  getHobbiesInterestsList():Observable<any>{
    return this.http.get(this.APIUrl + '/hobbies_interests/')
  }

  getHobbiesInterestById(id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}/hobbies_interests/${id}`);
  }

  addHobbiesInterest(val:any){
    return this.http.post(this.APIUrl + '/hobbies_interests/',val);
  }

  updateHobbiesInterest(val:any){
    return this.http.put(this.APIUrl + '/hobbies_interests/',val);
  }

  deleteHobbiesInterests(val:any){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: val
    };
    return this.http.delete(this.APIUrl + '/hobbies_interests/',httpOptions);
  }
}