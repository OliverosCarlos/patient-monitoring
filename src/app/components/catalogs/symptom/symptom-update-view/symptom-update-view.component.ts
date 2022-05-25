import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

//SERVICES
import { SymptomService } from 'src/app/services/catalogs/symptom.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-symptom-update-view',
  templateUrl: './symptom-update-view.component.html',
  styleUrls: ['./symptom-update-view.component.scss']
})
export class SymptomUpdateViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';

  chip = {'name':'',color:'white'};

  $headerAction!: Subscription;

  constructor(
    private headerService: HeaderService,
    private utilService: UtilService,
    private symptomService: SymptomService,
    private router : Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.setFocus();
    this.formGroup = this.fb.group({
      id: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      code: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      color: new FormControl(null, [Validators.required, Validators.maxLength(10)])
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
    this.symptomService.updateSymptom(this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['catalogs','symptom','table'])
    })
  }

  getSymptomById(id:any){
    if(id){
      this.symptomService.getSymptomById(id).subscribe({
        next: (v) => { this.setSymptom(v[0]) },
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
    this.router.navigate(['catalogs','symptom','form',this.route.snapshot.paramMap.get('symptom_id')]);
  }

  handleChangeComplete($event:any){
    this.chip.color = $event.color.hex;
    this.formGroup.get('color')!.setValue($event.color.hex);
  }

}
