import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { GenericSnackbarComponent } from 'src/app/utils/components/generic_snackbar/generic_snackbar.component';

import { NEUROPSYCHO } from 'src/app/utils/setup/routes.enum';

//MODELS
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-early_stimulation-form-view',
  templateUrl: './early_stimulation-form-view.component.html',
  styleUrls: ['./early_stimulation-form-view.component.scss']
})
export class EarlyStimulationFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  model : Model;

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';

  suscribeHeaderService!: Subscription;

  chip = {'name':'',color:'white'};

  $headerAction!: Subscription;

  yes_no_options = [{value:true, label:"SI"},{value:false, label:"NO"}]
  childbirth_type_options = [{value:"Espontaneo", label:"Espontáneo"},{value:"Inducido", label:"Inducido"},{value:"Cesarea", label:"Cesarea"}]
  childbirth_location_options = [{value:"Casa", label:"Casa"},{value:"Hospital", label:"Hospital"}]
  childbirth_support_options = [{value:"Medico", label:"Médico"},{value:"Comadrona", label:"Comadrona"},{value:"Ginecologo", label:"Ginecólogo"}]

  constructor(
    private backendService: BackendService,
    private router : Router,
    private route: ActivatedRoute,
    private headerService : HeaderService,
    private utilService : UtilService, 
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    // private stepperFisherProducerForm: StepperFisherProducerFormService
  ) {
    this.model = MODELS.find(model => model.name == 'early-stimulation')!;
    this.setFocus();
    this.formGroup = this.fb.group({
      medical_history: new FormGroup({
        medical_diagnosis: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        source_information: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        reason_consultation: new FormControl(null, [Validators.required, Validators.maxLength(250)])
        
      }),
      patient: new FormGroup({
        first_name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        last_name1: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        last_name2: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        address: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        age: new FormControl(0, [Validators.required]),
        date_of_birth: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        gender: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
        birthplace: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        residence_location: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      }),
      parental_data: new FormGroup({
        mother: new FormGroup({
          name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
          age: new FormControl(0, [Validators.required, Validators.min(1)]),
          kinship: new FormControl("Madre", [Validators.required, Validators.maxLength(50)]),
          education: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
          ocupation: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
          smoke_user: new FormControl(false, [Validators.required]),
          smoke_quantity: new FormControl(null),
          smoke_time: new FormControl(null),
          alcohol_user: new FormControl(false, [Validators.required]),
          alcohol_quantity: new FormControl(null),
          alcohol_time: new FormControl(null),
          addictions: new FormControl(false, [Validators.required]),
        }),
        father: new FormGroup({
          name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
          age: new FormControl(0, [Validators.required, Validators.min(1)]),
          kinship: new FormControl("Padre", [Validators.required, Validators.maxLength(50)]),
          education: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
          ocupation: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
          smoke_user: new FormControl(false, [Validators.required]),
          smoke_quantity: new FormControl(null),
          smoke_time: new FormControl(null),
          alcohol_user: new FormControl(false, [Validators.required]),
          alcohol_quantity: new FormControl(null),
          alcohol_time: new FormControl(null),
          addictions: new FormControl(false, [Validators.required]),
        }),
        parents_live_together: new FormControl(null, [Validators.required]),
        married: new FormControl(null, [Validators.required]),
        direct_family: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      }),
      prenatal_history: new FormGroup({
        planned_pregnancy : new FormControl(null, [Validators.required]),
        desired_pregnancy : new FormControl(null, [Validators.required]),
        reason_pregnancy : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        gestation_time : new FormControl(0.0, [Validators.required, Validators.min(0.1)]),
        prenatal_control : new FormControl(false, [Validators.required]),
        pregnancy_complications : new FormControl(false, [Validators.required]),
        pregnancy_complications_type : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        pregnancy_complications_cause : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        medications : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        childbirth_type : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        childbirth_location : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        childbirth_support : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        forceps : new FormControl(false, [Validators.required]),
        childbirth_duration : new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        anesthesia_type : new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        childbirth_complications : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        baby_weight : new FormControl(0, [Validators.required, Validators.min(0.1)]),
        baby_size : new FormControl(0, [Validators.required, Validators.min(1)]),
        premature : new FormControl(false, [Validators.required]),
        corrected_age : new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        incubation_time : new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        apgar : new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        cry : new FormControl(false, [Validators.required]),
        anomalies : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        notes : new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      }),
      hereditaryFamily_history: new FormGroup({
        diabetes: new FormControl(false, [Validators.required]),
        diabetes_who: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        hypertension: new FormControl(false, [Validators.required]),
        hypertension_who: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        cancer: new FormControl(false, [Validators.required]),
        cancer_who: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        alcoholism: new FormControl(false, [Validators.required]),
        alcoholism_who: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        mental_illnesses: new FormControl(false, [Validators.required]),
        mental_illnesses_who: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        mental_illnesses_other: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        mental_illnesses_another_family: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      }),
      personal_pathologic_antecedents: new FormGroup({
        allergies: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        child_physical_problems: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        TCE: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        PC: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        hospitalizations: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        current_medications: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
        neurological_risk_factors: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
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
    this.utilService.set({name:'early-stimulation', type:'form'});
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
  get patientForm() { return this.formGroup.get('patient') as FormGroup }

  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
  }

  showData(){
    console.log(this.formGroup);
    console.log(this.formGroup.value);
  }

  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'form', type: 'not-ready'});
  }

  private setFocus() {
    // setTimeout(() => this.firstInput.nativeElement !== undefined ? this.firstInput.nativeElement.focus() : '');
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
      }
    }
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

  save(){
    const date = this.patientForm.value.date_of_birth
    this.patientForm.get('date_of_birth')?.setValue(date.year+'-'+date.month+'-'+date.day)
    this.backendService.create(NEUROPSYCHO.MEDICAL_HISTORY, this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => {
        this.router.navigate(['../', 'main', 'clinical-history', 'early-stimulation', 'list']);
        this.showSuccess();
      }
    })
  }

  cancel(){
    this.router.navigate(['../', 'main', 'clinical-history', 'early-stimulation', 'list']);
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
