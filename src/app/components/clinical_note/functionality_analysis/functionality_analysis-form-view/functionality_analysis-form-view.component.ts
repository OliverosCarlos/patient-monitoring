import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { CATALOGS } from 'src/app/utils/setup/routes.enum';

import { BackendService } from 'src/app/services/backend.service';
import { Functionality_analysisService } from 'src/app/services/clinical_note/functionality_analysis.service';


import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-functionality_analysis-form-view',
  templateUrl: './functionality_analysis-form-view.component.html',
  styleUrls: ['./functionality_analysis-form-view.component.scss']
})
export class FunctionalityAnalysisFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;

  emotions_list = [];
  // suscribeAddressService: Subscription;

  // @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //   if (event.keyCode === 27) {
  //     event.stopImmediatePropagation();
  //     this.onClose();
  //   }
  // }

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService,
    private functionality_analysisService: Functionality_analysisService,
    private fb: FormBuilder,
  ) {
    this.formGroup = this.fb.group({
      emotion: new FormControl(null, [Validators.required]),
      emotion_name: new FormControl(null, []),
      conduct: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      functionality: new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });
    // this.router.events.subscribe((val) => {
    //   this.modalRef.hide();
    // });
  }
  ngAfterViewInit(): void {
    // this.suscribeAddressService = this.stepperFisherProducerForm.getAddressUpdate().subscribe(address => {
    //   this.formGroup.reset();
    //   this.paForm.street.setValue(address.data.street);
    //   this.paForm.int_number.setValue(address.data.int_number);
    //   this.paForm.ext_number.setValue(address.data.ext_number);
    //   this.paForm.between1.setValue(address.data.between1);
    //   this.paForm.between2.setValue(address.data.between2);
    //   this.paForm.references.setValue(address.data.references);
    //   this.paForm.zipcode.setValue(address.data.zipcode);
    //   this.paForm.neighborhood.setValue(address.data.neighborhood);
    //   if (address.data.zipcode) { this.searchByZipCode(); }
    // });
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

    // if(this.route.snapshot.paramMap.get('patient_id')){
    //   this.isUpdating = true;
    //   this.getPatientById(this.route.snapshot.paramMap.get('patient_id'));
    // }
    this.getAllEmotions();
  }

  get faForm() { return this.formGroup.controls }
  
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
  // cleanFormGroup() {
  //   this.formGroup.get('neighborhood').reset();
  //   this.formGroup.get('locality').reset();
  //   this.formGroup.get('municipality').reset();
  //   this.formGroup.get('state').reset();
  //   this.neighborhoods = [];
  // }

  // digitOnly(ev: any) {
  //   // wont allow e + -  .
  //   return (
  //     ev.keyCode !== 69 &&
  //     ev.keyCode !== 187 &&
  //     ev.keyCode !== 189 &&
  //     ev.keyCode !== 190
  //   );
  // }

  onClose(){}

  save(){
    this.functionality_analysisService.set(this.formGroup.value);
    // this.functionality_analysisService.addFunctionality_analysis(this.formGroup.value).subscribe({
    //   next: (v) => { console.log(v); },
    //   error: (e) => console.error(e),
    //   complete: () => console.log('completed')
    // })
  }

  onChange(item:any){
    this.faForm['emotion'].setValue(item.id);
    this.faForm['emotion_name'].setValue(item.name);
    console.log(item)
  }
}
