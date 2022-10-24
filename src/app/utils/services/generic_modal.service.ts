import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, Subject } from 'rxjs';

//models
import { GenericModal } from 'src/app/models/generic_modal.model';
@Injectable({
    providedIn: 'root'
})

export class GenericModalService {

    private genericModal: GenericModal = {title:'Title', options:['OK','CANCEL']};
    private data = new Subject<any>();

    constructor(private http: HttpClient) { }

    public setModalDefinition(genericModal: GenericModal){
        this.genericModal = genericModal;
    }

    public getModalDefinition():GenericModal{
        return this.genericModal;
    }

    public setModalData(data: any) {
        this.data.next(data);
    }

    public getModalData(): Observable<any> {
        return this.data.asObservable();
    }

}