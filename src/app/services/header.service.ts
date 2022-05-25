import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, Subject } from 'rxjs';

//models
import { Model } from 'src/app/models/vw-model.model';
import { EventComponent } from 'src/app/models/event_component.model'; 

@Injectable({
    providedIn: 'root'
})

export class HeaderService {

    private data = new Subject<any>();
    private inAction = new Subject<EventComponent>();
    private outAction = new Subject<EventComponent>();

    constructor(private http: HttpClient) { }

    public setHeader(data: any) {
        this.data.next(data);
    }

    public getHeader(): Observable<any> {
        return this.data.asObservable();
    }

    public sendInAction(action: EventComponent) {
        this.inAction.next(action);
    }

    public getInAction(): Observable<EventComponent> {
        return this.inAction.asObservable();
    }

    public sendOutAction(action: EventComponent) {
        this.outAction.next(action);
    }

    public getOutAction(): Observable<EventComponent> {
        return this.outAction.asObservable();
    }
}