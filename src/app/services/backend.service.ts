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

  tokenHttpOptionsFile = {
    params: {},
    headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'Authorization': 'Token ' + localStorage.getItem('token'),
        }),
    responseType: "blob" as const,
    observe: 'response' as const
  };

  tokenHttpMultipart = {
    headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token')
        })
  };

  constructor(private http:HttpClient) { }


  getAll(path: string, data_search: any):Observable<any>{
    this.tokenHttpOptions.params = data_search;
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

  getFile(path:string, id:string):Observable<any>{
    return this.http.get(`${this.APIUrl}${path}${id}`,  this.tokenHttpOptionsFile);
  }

  getManyByParams(path:string, params: any):Observable<any>{
    return this.http.get(this.construirRuta(`${this.APIUrl}${path}`, params),  this.tokenHttpOptions);
  }

  
  construirRuta(baseUrl: string, params: Record<string, any>): string {
    // Convertir los parámetros a una cadena de consulta
    const queryString = new URLSearchParams(params).toString();
    // Construir la URL completa con los parámetros dinámicos
    const fullUrl = `${baseUrl}?${queryString}`;
    return fullUrl;
  }
  
}