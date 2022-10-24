import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { CATALOGS } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-hobbies_interests-form-view',
  templateUrl: './hobbies_interests-form-view.component.html',
  styleUrls: ['./hobbies_interests-form-view.component.scss']
})
export class HobbiesInterestsFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';
  loading = false;
  zip_codes: any;
  neighborhoods = [];

  hobbies_interest_list = [];
  selected_hobbies_interest = [];
  // suscribeAddressService: Subscription;

  // @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //   if (event.keyCode === 27) {
  //     event.stopImmediatePropagation();
  //     this.onClose();
  //   }
  // }

  constructor(
    private backendService: BackendService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    // private handler: Handler,
    // public modalRef: BsModalRef,
    // private httpService: CrudService,
    // private router: Router,
    // private sessionService: SessionService,
    // private addressService: AddressesService,
    private fb: FormBuilder,
    // private stepperFisherProducerForm: StepperFisherProducerFormService
  ) {
    this.formGroup = this.fb.group({
      hobbies_interest: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      notes: new FormControl(null, [])
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

    this.getAllHobbiesInterest();
  }

  get paForm() { return this.formGroup.controls }
  
  ngOnDestroy() {
    // this.suscribeAddressService.unsubscribe();
  }

  onFormValid() {
    this.utilService.setHobbiesInterestsClinicalNote(this.formGroup.value);
  }

  onFormInvalid() {
    // this.stepperFisherProducerForm.setAddress(null, false);
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
      }
    }
  }

  getAllHobbiesInterest(){
    this.backendService.getAll(CATALOGS.HOBBIES_INTEREST).subscribe({
      next: (v) => { this.hobbies_interest_list = v },
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



}
