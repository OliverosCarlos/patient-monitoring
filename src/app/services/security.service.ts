import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe, mergeMap, map, concatMap } from 'rxjs';
import { SEC } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';

//models
import { Platform } from 'src/app/models/platform.model'; 
//SETUPS
import { MODELS } from 'src/app/utils/setup/model.setup';

@Injectable({
    providedIn: 'root'
})

export class SecurityService {

    readonly APIUrl = "http://127.0.0.1:8000";
    readonly PhotoUrl = "http://127.0.0.1:8000/media/";
    
    constructor(
        private http:HttpClient,
        private backendService : BackendService,
        ) { }
    
    // setup(data: any){


    //     this.backendService.getOneById(SEC.USER_BY_USERNAME ,data.username).subscribe({
    //         next: (v) => { 
    //             
    //         },
    //         error: (e) => console.error(e),
    //         complete: () => console.log('completed')
    //     })
    // }

    login(val:any): Observable<any> {
        let response = {status:''};
        const httpOptions = {
            headers: new HttpHeaders({
                 'Content-Type': 'application/json' ,
                 'Authorization': 'Basic ' + btoa(val.username+':'+val.password)
            })
        };
        
        return this.http.post(this.APIUrl + '/knox/login/',null,httpOptions)
        .pipe(
            mergeMap(
                (data: any) => {
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('expiry', data.expiry)
                    localStorage.setItem('logged', 'true')
                    this.backendService.tokenHttpOptions = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json' ,
                            'Authorization': 'Token ' + localStorage.getItem('token')
                            })
                    };
                    return this.backendService.getOneById(SEC.USER_BY_USERNAME, val.username)
                    .pipe(
                        mergeMap(
                         (user: any) => {
                             localStorage.setItem('usr',JSON.stringify(user));
                             return of({status:200, data:{}})
                         }
                        )
                    )
                }
            )
        )
    }

    logout(){
        const httpOptions = {
            headers: new HttpHeaders({
                 'Content-Type': 'application/json' ,
                 'Authorization': 'Token ' + localStorage.getItem('token')
                })
          };
        return this.http.post(this.APIUrl + '/knox/logout/',null,httpOptions);
    }

    isLogged(){
        return JSON.parse(localStorage.getItem('logged')!) ? true : false 
    }

    getGroups(){
        return JSON.parse(localStorage.getItem('usr')!).groups;
    }
}