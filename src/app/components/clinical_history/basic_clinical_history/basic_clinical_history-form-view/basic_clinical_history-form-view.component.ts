import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { PSYCHOTHERAPY, GENERAL } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';
import { Clinical_notesService } from 'src/app/services/clinical_note/clinical_note.service';
import { HeaderService } from 'src/app/services/header.service';

//MODELS
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import { FunctionalityAnalysisFormViewComponent } from 'src/app/components/clinical_history/basic_clinical_history/functionality_analysis/functionality_analysis-form-view/functionality_analysis-form-view.component';
import { FunctionalityAnalysisFormModalComponent } from 'src/app/components/clinical_history/basic_clinical_history/functionality_analysis/functionality_analysis-form-modal/functionality_analysis-form-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic_clinical_history-form-view',
  templateUrl: './basic_clinical_history-form-view.component.html',
  styleUrls: ['./basic_clinical_history-form-view.component.scss']
})
export class BasicClinicalHistoryFormViewComponent implements OnInit, AfterViewInit, OnDestroy {

  model : Model;

  mainFormGroup!: UntypedFormGroup;

  suscribeHeaderService!: Subscription;
  $reason_consultation_cn_form!: Subscription;
  $functionality_analysis_cn_form!: Subscription;
  $nonverbal_language_cn_form!: Subscription;
  $hobbies_interest_cn_form!: Subscription;
  $support_network_cn_form!: Subscription;
  $personal_characteristics_cn_form!: Subscription;
  $therapy_objectives_cn_form!: Subscription;
  $approach_cn_form!: Subscription;

  patientList = [];


  closeResult = '';

  $headerAction!: Subscription;

  constructor(
    private fb: FormBuilder,
    private backendService : BackendService,
    private modalService: NgbModal,
    private utilService : UtilService,
    private clinical_notesService: Clinical_notesService,
    private headerService : HeaderService,
    private router : Router,
  ) {
    this.model = MODELS.find(model => model.name == 'basic-clinical-history')!;
    this.mainFormGroup = this.fb.group({
      patient_id: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      reason_consultation: this.fb.group({
        notes: new FormControl(null),
        symptoms: new FormControl([], [Validators.required]),
      }),
      functionality_analysis: new FormArray([], [Validators.required]),
      nonverbal_language: this.fb.group({
        notes: new FormControl(null),
        time: new FormControl(null),
        person: new FormControl(null),
        space: new FormControl(null)
      }),
      hobbies_interest_list: this.fb.group({
        notes: new FormControl(null),
        hobbies_interest: new FormControl([], [Validators.required]),
      }),
      support_network: this.fb.group({
        notes: new FormControl(null),
        support_network_list: new FormArray([], [Validators.required]),
      }),
      personal_characteristics: this.fb.group({
        notes: new FormControl(null, [Validators.required]),
      }),
      therapy_objectives: this.fb.group({
        notes: new FormControl(null, [Validators.required]),
      }),
      approach: this.fb.group({
        notes: new FormControl(null, [Validators.required]),
      })
    });
   }

  ngOnDestroy(): void {
    this.$headerAction!.unsubscribe();
    this.$reason_consultation_cn_form.unsubscribe();
    this.$functionality_analysis_cn_form.unsubscribe();
    this.$nonverbal_language_cn_form.unsubscribe();
    this.$hobbies_interest_cn_form.unsubscribe();
    this.$support_network_cn_form.unsubscribe();
    this.$personal_characteristics_cn_form.unsubscribe();
    this.$therapy_objectives_cn_form.unsubscribe();
    this.$approach_cn_form.unsubscribe();
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
    this.$reason_consultation_cn_form = this.utilService.getreasonConsultationClinicalNote().subscribe(reason_consultation => {
      this.reasonConsultationForm.get('notes')?.setValue(reason_consultation.notes);
      this.reasonConsultationForm.get('symptoms')?.setValue(reason_consultation.symptoms);
    })
    this.$functionality_analysis_cn_form = this.utilService.getFunctionalityAnalysisClinicalNote().subscribe(functionality_analysis => {
      functionality_analysis.forEach( (value: any) => {
        const newItem = this.fb.group({
          conduct: [value.conduct, Validators.required],
          emotion_id: [value.emotion, Validators.required],
          functionality: [value.functionality, Validators.required]
        });
        this.functionalityAnalysisArray.push(newItem);
      })
      
    })
    this.$nonverbal_language_cn_form = this.utilService.getNonverbalLanguageClinicalNote().subscribe(nonverbal_language => {
      this.nonverbalLanguageForm.get('notes')?.setValue(nonverbal_language.notes);
      this.nonverbalLanguageForm.get('time')?.setValue(nonverbal_language.time);
      this.nonverbalLanguageForm.get('person')?.setValue(nonverbal_language.person);
      this.nonverbalLanguageForm.get('space')?.setValue(nonverbal_language.space);
    })
    this.$hobbies_interest_cn_form = this.utilService.getHobbiesInterestsClinicalNote().subscribe(hobbies_interest_list => {
      this.hobbiesInterestForm.get('notes')?.setValue(hobbies_interest_list.notes);
      this.hobbiesInterestForm.get('hobbies_interest')?.setValue(hobbies_interest_list.hobbies_interest);
    })
    this.$support_network_cn_form = this.utilService.getSupportNetworkClinicalNote().subscribe(support_network_data => {
      this.supportNetworkForm.get('notes')?.setValue('field to add')
      console.log("data", support_network_data);
      
      support_network_data.forEach((support_network: any) => {
        const newItem = this.fb.group({
          name: [support_network.name, Validators.required],
          area: [support_network.area, Validators.required],
          level: [support_network.level, Validators.required]
        });
        this.supportNetworkListArray.push(newItem);
      })
    })
    this.$personal_characteristics_cn_form = this.utilService.getPersonalCharacteristicsClinicalNote().subscribe(personalCharacteristics => {
      this.personalCharacteristicsForm.get('notes')?.setValue(personalCharacteristics.notes);
    })
    this.$therapy_objectives_cn_form = this.utilService.getTherapyObjectivesClinicalNote().subscribe(therapyObjectives => {
      this.therapyObjectivesForm.get('notes')?.setValue(therapyObjectives.notes);
    })
    this.$approach_cn_form = this.utilService.getApproachClinicalNote().subscribe(approach => {
      this.approachForm.get('notes')?.setValue(approach.notes);
    })
  }
  

  get reasonConsultationForm() { return this.mainFormGroup.get('reason_consultation') as UntypedFormGroup }
  get functionalityAnalysisArray(): FormArray { return this.mainFormGroup.get('functionality_analysis') as FormArray }
  get nonverbalLanguageForm() { return this.mainFormGroup.get('nonverbal_language') as UntypedFormGroup }
  get hobbiesInterestForm() { return this.mainFormGroup.get('hobbies_interest_list') as UntypedFormGroup }
  get supportNetworkForm() { return this.mainFormGroup.get('support_network') as UntypedFormGroup }
  get supportNetworkListArray(): FormArray { return this.supportNetworkForm.get('support_network_list') as FormArray }
  get personalCharacteristicsForm() { return this.mainFormGroup.get('personal_characteristics') as UntypedFormGroup }
  get therapyObjectivesForm() { return this.mainFormGroup.get('therapy_objectives') as UntypedFormGroup }
  get approachForm() { return this.mainFormGroup.get('approach') as UntypedFormGroup }

  ngOnInit(): void {
    this.headerService.setHeader({model: this.model, type: 'form'});
    this.utilService.set({name:'basic-clinical-history', type:'form'});
    this.mainFormGroup.statusChanges
    .pipe(
      filter(() => this.mainFormGroup.valid))
    .subscribe(() => this.onFormValid());

  this.mainFormGroup.statusChanges
    .pipe(
      filter(() => this.mainFormGroup.invalid))
    .subscribe(() => this.onFormInvalid());
  }

  tst(){
    console.log(this.mainFormGroup.value)
  }

  open() {
    let modal_setup: NgbModalOptions = {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'modal-xxl',
    }

    this.modalService.open(FunctionalityAnalysisFormModalComponent, modal_setup
      ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('resultado');
      console.log(result);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }

  onFormInvalid() {
    // console.log(this.mainFormGroup.value);
  }

  setPatient($ev:any){
    this.mainFormGroup.get('patient_id')?.setValue($ev.id);
  }

  save(){
    this.backendService.create(GENERAL.CLINICAL_HISTORY_PSYCHOTHERAPY ,this.mainFormGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => console.log('clinical note added')
    })
  }

  onClose(){}

  cancel(){
    this.router.navigate(['../','main','catalogs','emotions']);
  }
}
