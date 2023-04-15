import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe, mergeMap, map, concatMap } from 'rxjs';
import { SEC } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';

//models
import { Platform } from 'src/app/models/platform.model'; 
//SETUPS
import { environment } from 'src/environments/environment'
import { MODELS } from 'src/app/utils/setup/model.setup';

@Injectable({
    providedIn: 'root'
})

export class SecurityService {
    
    readonly APIUrl = environment.backend_url;
    readonly PhotoUrl = environment.backend_url+"/media/";
    
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
                        params: {},
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json' ,
                            'Authorization': 'Token ' + localStorage.getItem('token')
                            })
                    };
                    return this.backendService.getOneById(SEC.USER_BY_USERNAME, val.username)
                    .pipe(
                        mergeMap(
                         (info: any) => {
                            console.log(info);
                            
                            localStorage.setItem('usr',JSON.stringify(info.user));
                            localStorage.setItem('patient',JSON.stringify(info.patient));
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