import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';

//SETUP
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly APIUrl = environment.backend_url;
  readonly PhotoUrl = environment.backend_url+"/media/";

  tokenHttpOptions = {
    params: {},
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


  getAll(path: string, data_search: any):Observable<any>{
    console.log('back serv DATA SEARCH');
    
    
    
    this.tokenHttpOptions.params = data_search;
    console.log(this.tokenHttpOptions);
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