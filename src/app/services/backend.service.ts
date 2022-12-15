import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly APIUrl = "http://143.244.213.215";
  readonly APIMediaUrl = "http://143.244.213.215/media/";

  tokenHttpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'Authorization': 'Token ' + localStorage.getItem('token')
        })
  };

  tokenHttpMultipart = {
    headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token')
        })
  };

  constructor(private http:HttpClient) { }


  getAll(path: string):Observable<any>{
    return this.http.get(`${this.APIUrl}${path}`,  this.tokenHttpOptions);
  }
  
  getOneById(path:string, id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}${path}${id}`,  this.tokenHttpOptions);
  }

  create(path:string, val:any){
    return this.http.post(`${this.APIUrl}${path}`, val,  this.tokenHttpOptions);
  }

  createWithFile(path: string, val:any){
    return this.http.post(`${this.APIUrl}${path}`, val,  this.tokenHttpMultipart);
  }

  update(path: string, id:any, val:any){
    return this.http.put(`${this.APIUrl}${path}${id}`, val,  this.tokenHttpOptions);
  }

  delete(path:string, val:any, id=0){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json' ,
        'Authorization': 'Token ' + localStorage.getItem('token')
      }), body: val
    };
    return this.http.delete(`${this.APIUrl}${path}${id}`, httpOptions);
  }

  login(val:any){
    const basicAuthHttpOptions = {
      headers: new HttpHeaders({
           'Content-Type': 'application/json' ,
           'Authorization': 'Basic ' + btoa(val.username+':'+val.password)
          })
    };
    return this.http.post(this.APIUrl + '/knox/login/',null, basicAuthHttpOptions);
  }

}