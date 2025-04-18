import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CATALOGS } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-symptom-update-view',
  templateUrl: './symptom-update-view.component.html',
  styleUrls: ['./symptom-update-view.component.scss']
})
export class SymptomUpdateViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: UntypedFormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';

  model : Model;

  chip = {'name':'',color:'white'};

  $headerAction!: Subscription;

  constructor(
    private headerService: HeaderService,
    private utilService: UtilService,
    private backendService: BackendService,
    private router : Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {
    this.model = MODELS.find(model => model.name == 'symptom')!;
    this.setFocus();
    this.formGroup = this.fb.group({
      id: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      code: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      name: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      color: new UntypedFormControl(null, [Validators.required, Validators.maxLength(10)])
    });
  }

  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      console.log(data)
      switch (data.action) {
        case 'update':
          this.update();
          break;
        case 'cancel':
          this.cancel();
          break;
        default:
          break;
      }
    });
  }

  ngOnInit() {
    this.headerService.setHeader({name:'symptom',type:'edit'});
    this.utilService.set({name:'symptom', type:'update'});
    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.valid))
      .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.invalid))
      .subscribe(() => this.onFormInvalid());

    if(this.route.snapshot.paramMap.get('symptom_id')){
      this.getSymptomById(this.route.snapshot.paramMap.get('symptom_id'));
    }
  }

  get paForm() { return this.formGroup.controls }
  
  ngOnDestroy() {
    this.$headerAction.unsubscribe();
  }

  onFormValid() {
    this.headerService.sendInAction({action:'update', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'update', type: 'not-ready'});
  }

  private setFocus() {
    setTimeout(() => this.firstInput.nativeElement !== undefined ? this.firstInput.nativeElement.focus() : '');
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
        this.chip.name = this.formGroup.get(formName)!.value;

      }
    }
  }

  update(){
    this.backendService.update(CATALOGS.SYMPTOMS, this.route.snapshot.paramMap.get('symptom_id'), this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['main','catalogs','symptom','list'])
    })
  }

  getSymptomById(id:any){
    if(id){
      this.backendService.getOneById(CATALOGS.SYMPTOMS, id).subscribe({
        next: (v) => { this.setSymptom(v) },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  setSymptom(symptom:any){
    this.formGroup.get('id')!.setValue(this.route.snapshot.paramMap.get('symptom_id'));
    this.formGroup.get('code')!.setValue(symptom.code);
    this.formGroup.get('name')!.setValue(symptom.name);
    this.formGroup.get('color')!.setValue(symptom.color);
    this.chip.name = symptom.name;
    this.chip.color = symptom.color;
  }

  cancel(){
    this.router.navigate(['main','catalogs','symptom','form',this.route.snapshot.paramMap.get('symptom_id')]);
  }

  handleChangeComplete($event:any){
    this.chip.color = $event.color.hex;
    this.formGroup.get('color')!.setValue($event.color.hex);
  }

}
