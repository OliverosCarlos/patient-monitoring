import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, Subject } from 'rxjs';

//models
import { Model, ModuleModel } from 'src/app/models/vw-model.model';
import { MODULE_MODELS } from 'src/app/utils/setup/model.setup';
import { EventComponent } from 'src/app/models/event_component.model'; 

@Injectable({
    providedIn: 'root'
})

export class SetupService {

    private module = new Subject<any>();
    private viewType = new Subject<string>();


    constructor() { }

    public setModule(module_name: string) {
        this.module.next(MODULE_MODELS.find(model => model.name == module_name));
    }

    public getModule(): Observable<ModuleModel> {
        return this.module.asObservable();
    }

    //MAIN VIEW TYPE
    public setViewType(module_name: string) { this.viewType.next(module_name); }
    public getViewType(): Observable<string> { return this.viewType.asObservable(); }

}