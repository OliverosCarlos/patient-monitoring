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
  selector: 'app-symptom-form-view',
  templateUrl: './symptom-form-view.component.html',
  styleUrls: ['./symptom-form-view.component.scss']
})
export class SymptomFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';

  chip = {'name':'',color:'white'};

  $headerAction!: Subscription;

  constructor(
    private symptomService: SymptomService,
    private router : Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private headerService : HeaderService,
    private utilService : UtilService
  ) {
    this.setFocus();
    this.formGroup = this.fb.group({
      code: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      color: new FormControl(null, [Validators.required, Validators.maxLength(10)])
    });

  }

  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      switch (data.action) {
        case 'save':
          this.save();
          break;

        case 'cancel':
          this.cancel();
          break;

        default:
          break;
      }
    });
    this.utilService.set({name:'symptom', type:'update'});
  }

  ngOnInit() {
    this.headerService.setHeader({name:'symptom', type:'form'});
    this.utilService.set({name:'symptom', type:'form'});
    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.valid))
      .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.invalid))
      .subscribe(() => this.onFormInvalid());
  }

  get paForm() { return this.formGroup.controls }
  
  ngOnDestroy() {
    this.$headerAction.unsubscribe();
  }

  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }
  
  cancel(){
    this.router.navigate(['catalogs','symptom','table']);
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'form', type: 'not-ready'});
  }

  private setFocus() {
    setTimeout(() => this.firstInput.nativeElement !== undefined ? this.firstInput.nativeElement.focus() : '');
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
      }
    }
  }

  save(){
    this.symptomService.addSymptom(this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['catalogs','symptom','table'])
    })
  }

  setChip(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
        this.chip.name = value.toUpperCase();
      }
    }
  }

  handleChangeComplete($event:any){
    this.chip.color = $event.color.hex;
    this.formGroup.get('color')!.setValue($event.color.hex);
  }


}
