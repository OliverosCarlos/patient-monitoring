import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { PSYCHOTHERAPY } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';
import { Clinical_notesService } from 'src/app/services/clinical_note/clinical_note.service';

import { FunctionalityAnalysisFormViewComponent } from 'src/app/components/clinical_note/functionality_analysis/functionality_analysis-form-view/functionality_analysis-form-view.component';
import { FunctionalityAnalysisFormModalComponent } from 'src/app/components/clinical_note/functionality_analysis/functionality_analysis-form-modal/functionality_analysis-form-modal.component';

@Component({
  selector: 'app-clinical-note-form',
  templateUrl: './clinical-note-form.component.html',
  styleUrls: ['./clinical-note-form.component.scss']
})
export class ClinicalNoteFormComponent implements OnInit, AfterViewInit {

  mainFormGroup!: FormGroup;

  suscribeHeaderService!: Subscription;
  $patient_cn_form!: Subscription;
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

  constructor(
    private _formBuilder: FormBuilder,
    private backendService : BackendService,
    private modalService: NgbModal,
    private utilService : UtilService,
    private clinical_notesService: Clinical_notesService
  ) {
    this.mainFormGroup = this._formBuilder.group({
      formGroupPatient: this._formBuilder.group({
        patient_data: new FormControl(null, [])
      }),
      formGroupReasonConsultation: this._formBuilder.group({
        reasonConsultation_data: new FormControl(null, [])
      }),
      formGroupFunctionalityAnalysis: this._formBuilder.group({
        functionalityAnalysis_data: new FormControl(null, [])
      }),
      formGroupNonverbalLanguage: this._formBuilder.group({
        nonverbalLanguage_data: new FormControl(null, [])
      }),
      formGroupHobbiesInterest: this._formBuilder.group({
        hobbiesInterest_data: new FormControl(null, [])
      }),
      formGroupSupportNetwork: this._formBuilder.group({
        supportNetwork_data: new FormControl(null, [])
      }),
      formGroupPersonalCharacteristics: this._formBuilder.group({
        personalCharacteristics_data: new FormControl(null, [])
      }),
      formGroupTherapyObjectives: this._formBuilder.group({
        therapyObjectives_data: new FormControl(null, [])
      }),
      formGroupApproach: this._formBuilder.group({
        approach_data: new FormControl(null, [])
      })
    });
   }

  ngAfterViewInit(): void {
    this.$patient_cn_form = this.utilService.getPatientClinicalNote().subscribe(patient => {
      this.patientForm.get('patient_data')?.setValue(patient);
    })
    this.$reason_consultation_cn_form = this.utilService.getreasonConsultationClinicalNote().subscribe(reason_consultation => {
      this.reasonConsultationForm.get('reasonConsultation_data')?.setValue(reason_consultation);
    })
    this.$functionality_analysis_cn_form = this.utilService.getFunctionalityAnalysisClinicalNote().subscribe(functionality_analysis => {
      this.functionalityAnalysisForm.get('functionalityAnalysis_data')?.setValue(functionality_analysis);
    })
    this.$nonverbal_language_cn_form = this.utilService.getNonverbalLanguageClinicalNote().subscribe(nonverbal_language => {
      this.nonverbalLanguageForm.get('nonverbalLanguage_data')?.setValue(nonverbal_language);
    })
    this.$hobbies_interest_cn_form = this.utilService.getHobbiesInterestsClinicalNote().subscribe(hobbies_interest => {
      this.hobbiesInterestForm.get('hobbiesInterest_data')?.setValue(hobbies_interest);
    })
    this.$support_network_cn_form = this.utilService.getSupportNetworkClinicalNote().subscribe(support_network => {
      this.supportNetworkForm.get('supportNetwork_data')?.setValue(support_network);
    })
    this.$personal_characteristics_cn_form = this.utilService.getPersonalCharacteristicsClinicalNote().subscribe(personalCharacteristics => {
      this.personalCharacteristicsForm.get('personalCharacteristics_data')?.setValue(personalCharacteristics);
    })
    this.$therapy_objectives_cn_form = this.utilService.getTherapyObjectivesClinicalNote().subscribe(therapyObjectives => {
      this.therapyObjectivesForm.get('therapyObjectives_data')?.setValue(therapyObjectives);
    })
    this.$approach_cn_form = this.utilService.getApproachClinicalNote().subscribe(approach => {
      this.approachForm.get('approach_data')?.setValue(approach);
    })
  }
  
  get patientForm() { return this.mainFormGroup.get('formGroupPatient') as FormGroup }
  get reasonConsultationForm() { return this.mainFormGroup.get('formGroupReasonConsultation') as FormGroup }
  get functionalityAnalysisForm() { return this.mainFormGroup.get('formGroupFunctionalityAnalysis') as FormGroup }
  get nonverbalLanguageForm() { return this.mainFormGroup.get('formGroupNonverbalLanguage') as FormGroup }
  get hobbiesInterestForm() { return this.mainFormGroup.get('formGroupHobbiesInterest') as FormGroup }
  get supportNetworkForm() { return this.mainFormGroup.get('formGroupSupportNetwork') as FormGroup }
  get personalCharacteristicsForm() { return this.mainFormGroup.get('formGroupPersonalCharacteristics') as FormGroup }
  get therapyObjectivesForm() { return this.mainFormGroup.get('formGroupTherapyObjectives') as FormGroup }
  get approachForm() { return this.mainFormGroup.get('formGroupApproach') as FormGroup }

  ngOnInit(): void {
    this.mainFormGroup.statusChanges
    .pipe(
      filter(() => this.mainFormGroup.valid))
    .subscribe(() => this.onFormValid());

  this.mainFormGroup.statusChanges
    .pipe(
      filter(() => this.mainFormGroup.invalid))
    .subscribe(() => this.onFormInvalid());
    this.getAllPatients();
  }

  getAllPatients(){
    this.backendService.getAll(PSYCHOTHERAPY.PATIENT).subscribe({
      next: (v) => { this.patientList = v },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
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
    console.log(this.mainFormGroup.value);
  }

  onFormInvalid() {
    // console.log(this.mainFormGroup.value);
  }

  save(){
    this.backendService.create(PSYCHOTHERAPY.CLINICAL_NOTES_CREATE ,this.mainFormGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => console.log('clinical note added')
    })
  }

  onClose(){}
}
