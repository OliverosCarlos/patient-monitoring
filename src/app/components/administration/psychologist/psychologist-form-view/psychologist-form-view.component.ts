import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 

import { PsychologistService } from 'src/app/services/administration/psychologist.service';
// import { CrudService } from 'src/app/providers/api/crud.service';
// import { Handler } from 'src/app/utils/handler';
// import swal from 'sweetalert2';
// import { Utils } from 'src/app/utils/utils';
// import { Router } from '@angular/router';
// import { PATH_REQUEST } from 'src/app/utils/enums/pathRequest.enum';
// import { SessionService, AddressesService, StepperFisherProducerFormService } from 'src/app/providers/providers.index';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-psychologist-form-view',
  templateUrl: './psychologist-form-view.component.html',
  styleUrls: ['./psychologist-form-view.component.scss']
})
export class PsychologistFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;
  zip_codes: any;
  neighborhoods = [];
  // suscribeAddressService: Subscription;
  formData: FormData = new FormData();
  // @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //   if (event.keyCode === 27) {
  //     event.stopImmediatePropagation();
  //     this.onClose();
  //   }
  // }

  constructor(
    private psychologistService: PsychologistService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    // private handler: Handler,
    // public modalRef: BsModalRef,
    // private httpService: CrudService,
    // private router: Router,
    // private sessionService: SessionService,
    // private addressService: AddressesService,
    private fb: FormBuilder,
    // private stepperFisherProducerForm: StepperFisherProducerFormService
  ) {
    this.setFocus();
    this.formGroup = this.fb.group({
      psychologist_files: this._formBuilder.group({
        photo: new FormControl(null, [Validators.required])
      }),
      psychologist_data: this._formBuilder.group({
        first_name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        last_name1: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        last_name2: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        age: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        email: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        phone_number: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        university: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        studies: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        profile: new FormControl(null, [Validators.required, Validators.maxLength(250)])
      }),
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
  }

  get pForm() { return this.formGroup.get('psychologist_data') as FormGroup }
  
  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormValid() {
    const sendDataParent = {
      formGroup: this.formGroup.value,
      zip_codes: this.zip_codes
    };
    // this.stepperFisherProducerForm.setAddress(sendDataParent, true);
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  save(){
    this.formData.append('psychologist_files', this.formGroup.value.psychologist_files.photo[0].file);
    this.formData.append('psychologist_data', JSON.stringify(this.formGroup.value.psychologist_data));
    this.psychologistService.addPsychologist(this.formData).subscribe({
      next: (v) => { console.log(v); },
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



}
