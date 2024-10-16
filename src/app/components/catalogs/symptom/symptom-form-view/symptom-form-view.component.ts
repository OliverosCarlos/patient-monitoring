import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CATALOGS } from 'src/app/utils/setup/routes.enum';
import { GenericSnackbarComponent } from 'src/app/utils/components/generic_snackbar/generic_snackbar.component';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';

//MODELS
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-symptom-form-view',
  templateUrl: './symptom-form-view.component.html',
  styleUrls: ['./symptom-form-view.component.scss']
})
export class SymptomFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: UntypedFormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';

  model : Model;

  chip = {'name':'',color:'white'};

  $headerAction!: Subscription;

  constructor(
    private backendService: BackendService,
    private router : Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private headerService : HeaderService,
    private utilService : UtilService,
    private _snackBar: MatSnackBar,
  ) {
    this.model = MODELS.find(model => model.name == 'symptom')!;
    this.setFocus();
    this.formGroup = this.fb.group({
      code: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      name: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      color: new UntypedFormControl(null, [Validators.required, Validators.maxLength(10)])
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
    this.headerService.setHeader({model: this.model, type:'form'});
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
    this.router.navigate(['../','main','catalogs','symptom', 'list']);
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
    this.backendService.create(CATALOGS.SYMPTOMS ,this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => {
        this.showSuccess();
        this.router.navigate(['../','main','catalogs','symptom', 'list'])
      }
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

  showSuccess(){
    this._snackBar.openFromComponent(GenericSnackbarComponent, {
      data: {
        message: "Elemento creado correctamente",
        icon: "done"
      },
      duration: 5000
    });
  }

}
