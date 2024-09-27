import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, Subject } from 'rxjs';

//models
import { Platform } from 'src/app/models/platform.model'; 
//SETUPS
import { MODELS } from 'src/app/utils/setup/model.setup';

@Injectable({
    providedIn: 'root'
})

export class UtilService {

    private platformComponent = new Subject<Platform>();
    private perfil = new Subject<any>();

    //COMPONETS
    private  networkAreas = new Subject<any>();
    //CLINICAL NOTES
    private  patient_clinical_note = new Subject<any>();
    private  reason_consultation_clinical_note = new Subject<any>();
    private  functionality_analysis_clinical_note = new Subject<any>();
    private  nonverbal_language_clinical_note = new Subject<any>();
    private  hobbies_interests_clinical_note = new Subject<any>();
    private  support_network_clinical_note = new Subject<any>();
    private  personal_characteristics_clinical_note = new Subject<any>();
    private  therapy_objectives_clinical_note = new Subject<any>();
    private  approach_clinical_note = new Subject<any>();
    //TASK DASHBOARD
    private  task_dashboard = new Subject<any>();


    constructor() { }

    public set(data: any) {
        this.platformComponent.next(
            MODELS.filter(m=>m.name == data.name)
            .map(x=>(
                { 
                    'title':x.plural_name,
                    'subtitle':x.components.filter(c=>c.view_type==data.type)[0].view_type,
                    'content_type':x.components.filter(c=>c.view_type==data.type)[0].content_type,
                    'menus': x.menus ? x.menus : []
                }
            ))[0]
        )
    }

    public get(): Observable<Platform> {
        return this.platformComponent.asObservable();
    }

    public setPerfil(data: any){
        this.perfil.next(data);
    }

    public getPerfil(): Observable<any>{
        return this.perfil.asObservable();
    }

    public setNetworkArea(data: any){
        this.networkAreas.next(data);
    }

    public getNetworkArea(){
        return this.networkAreas.asObservable();
    }

    //COMPONENTS
    public setPatientClinicalNote(data: any){
        this.patient_clinical_note.next(data);
    }

    public getPatientClinicalNote(){
        return this.patient_clinical_note.asObservable();
    }

    public setreasonConsultationClinicalNote(data: any){
        this.reason_consultation_clinical_note.next(data);
    }

    public getreasonConsultationClinicalNote(){
        return this.reason_consultation_clinical_note.asObservable();
    }

    public setFunctionalityAnalysisClinicalNote(data: any){
        this.functionality_analysis_clinical_note.next(data);
    }

    public getFunctionalityAnalysisClinicalNote(){
        return this.functionality_analysis_clinical_note.asObservable();
    }

    public setNonverbalLanguageClinicalNote(data: any){
        this.nonverbal_language_clinical_note.next(data);
    }

    public getNonverbalLanguageClinicalNote(){
        return this.nonverbal_language_clinical_note.asObservable();
    }

    public setHobbiesInterestsClinicalNote(data: any){
        this.hobbies_interests_clinical_note.next(data);
    }

    public getHobbiesInterestsClinicalNote(){
        return this.hobbies_interests_clinical_note.asObservable();
    }

    public setSupportNetworkClinicalNote(data: any){
        this.support_network_clinical_note.next(data);
    }

    public getSupportNetworkClinicalNote(){
        return this.support_network_clinical_note.asObservable();
    }

    public setPersonalCharacteristicsClinicalNote(data: any){
        this.personal_characteristics_clinical_note.next(data);
    }

    public getPersonalCharacteristicsClinicalNote(){
        return this.personal_characteristics_clinical_note.asObservable();
    }

    public setTherapyObjectivesClinicalNote(data: any){
        this.therapy_objectives_clinical_note.next(data);
    }

    public getTherapyObjectivesClinicalNote(){
        return this.therapy_objectives_clinical_note.asObservable();
    }

    public setApproachClinicalNote(data: any){
        this.approach_clinical_note.next(data);
    }

    public getApproachClinicalNote(){
        return this.approach_clinical_note.asObservable();
    }

    //TASK DASHBOARD
    public setPatientTaskAssigned(task_dashboard: any){
        this.task_dashboard.next(task_dashboard);
    }

    public getPatientTaskAssigned(){
        return this.task_dashboard.asObservable();
    }
    
}