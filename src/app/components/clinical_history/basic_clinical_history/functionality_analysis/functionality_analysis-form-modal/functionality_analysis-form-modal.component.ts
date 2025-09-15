import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { CATALOGS } from 'src/app/utils/setup/routes.enum';

import { BackendService } from 'src/app/services/backend.service';
import { Functionality_analysisService } from 'src/app/services/clinical_note/functionality_analysis.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-functionality_analysis-form-modal',
  templateUrl: './functionality_analysis-form-modal.component.html',
  styleUrls: ['./functionality_analysis-form-modal.component.scss']
})
export class FunctionalityAnalysisFormModalComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: UntypedFormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;

  emotions_list = [];

  displayedColumns = ['emotion_name','conduct','functionality'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private functionality_analysisService: Functionality_analysisService,
    private fb: UntypedFormBuilder,
    private utilService : UtilService,
  ) {
    this.formGroup = this.fb.group({
      emotion: new UntypedFormControl(null, [Validators.required]),
      emotion_name: new UntypedFormControl(null, []),
      conduct: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)]),
      functionality: new UntypedFormControl(null, [Validators.required, Validators.maxLength(250)])
    });
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.valid))
      .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.invalid))
      .subscribe(() => this.onFormInvalid());

    this.getAllEmotions();
  }

  get paForm() { return this.formGroup.controls }

  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormValid() {
    // const sendDataParent = {
    //   formGroup: this.formGroup.value,
    //   zip_codes: this.zip_codes
    // };
    // this.stepperFisherProducerForm.setAddress(sendDataParent, true);
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
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

  getAllEmotions(){
    this.backendService.getAll(CATALOGS.EMOTIONS,{}).subscribe({
      next: (v) => { this.emotions_list = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  onClose(){}

  add(){
    this.dataSource.data = [...this.dataSource.data, this.formGroup.value]
  }

  save(){
    this.functionality_analysisService.set(this.dataSource.data);
    this.utilService.setFunctionalityAnalysisClinicalNote(this.dataSource.data);
  }

  onChange(item:any){
    this.paForm['emotion'].setValue(item.id);
    this.paForm['emotion_name'].setValue(item.name);
    console.log(item)
  }

}
