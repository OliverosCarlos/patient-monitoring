import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ADMINISTRATION } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//MODELS
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { HttpClient } from  '@angular/common/http';
import { DemoFilePickerAdapter } from  './demo-file-picker.adapter';

@Component({
  selector: 'app-psychologist-form-view',
  templateUrl: './psychologist-form-view.component.html',
  styleUrls: ['./psychologist-form-view.component.scss']
})
export class PsychologistFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  model : Model;

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: UntypedFormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;
  zip_codes: any;
  neighborhoods = [];

  formData: FormData = new FormData();

  $headerAction!: Subscription;
 
  adapter = new  DemoFilePickerAdapter(this.http);

  fileName = ""
  
  constructor(
    private backendService: BackendService,
    private headerService : HeaderService,
    private utilService : UtilService,
    private route: ActivatedRoute,
    private router : Router,
    private _formBuilder: UntypedFormBuilder,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {
    this.model = MODELS.find(model => model.name == 'psychologist')!;
    this.setFocus();
    this.formGroup = this.fb.group({
      psychologist_files: this._formBuilder.group({
        photo: new UntypedFormControl(null, [Validators.required])
      }),
      psychologist_data: this._formBuilder.group({
        first_name: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
        last_name1: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
        last_name2: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
        age: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
        email: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
        phone_number: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
        university: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
        studies: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
        profile: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)])
      }),
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
  }

  ngOnInit() {
    this.headerService.setHeader({model: this.model, type: 'form'});
    this.utilService.set({name:'psychologist', type:'form'});
    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.valid))
      .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.invalid))
      .subscribe(() => this.onFormInvalid());
  }

  get pForm() { return this.formGroup.get('psychologist_data') as UntypedFormGroup }
  
  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'form', type: 'not-ready'});
  }

  save(){
    console.log(this.formGroup.value);
    
    this.formData.append('psychologist_data', JSON.stringify(this.formGroup.value.psychologist_data));
    this.backendService.createWithFile(ADMINISTRATION.PSYCHOLOGIST_CREATE ,this.formData).subscribe({
      next: (v) => { 
        this.router.navigate(['main','administration','psychologist','table']); 
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  private setFocus() {
    setTimeout(() => this.firstInput.nativeElement !== undefined ? this.firstInput.nativeElement.focus() : '');
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.pForm.get(formName)!.value;
      if (value) {
        this.pForm.get(formName)!.setValue(value.toUpperCase());
      }
    }
  }

  cancel(){
    this.router.navigate(['main','administration','psychologist','table']);
  }

  onFileSelected(event: any ) {

    const file:File = event.target.files[0];
    console.log("file");
    this.formData.append('psychologist_files', file);
      // if (file) {

      //     this.fileName = file.name;

      //     const formData = new FormData();

      //     formData.append("thumbnail", file);

      //     const upload$ = this.http.post("/api/thumbnail-upload", formData);

      //     upload$.subscribe();
      // }
 }

}
