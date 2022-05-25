import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 

import { PatientService } from 'src/app/services/patient.service';
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
  selector: 'app-school_area-form-view',
  templateUrl: './school_area-form-view.component.html',
  styleUrls: ['./school_area-form-view.component.scss']
})
export class SchoolAreaFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;
  zip_codes: any;
  neighborhoods = [];
  // suscribeAddressService: Subscription;

  // @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //   if (event.keyCode === 27) {
  //     event.stopImmediatePropagation();
  //     this.onClose();
  //   }
  // }

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
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
      shared_space: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      relationship: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      number: new FormControl(null, [])
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

  get paForm() { return this.formGroup.controls }
  
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
