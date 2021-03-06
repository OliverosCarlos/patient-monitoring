//File generated by vaweei CLI
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

//SERVICES
import { HeaderService } from 'src/app/services/header.service';
import { HobbiesInterestService } from 'src/app/services/catalogs/hobbies_interest.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-tracking-form-view',
  templateUrl: './tracking-form-view.component.html',
  styleUrls: ['./tracking-form-view.component.scss']
})
export class TrackingFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';

  $headerAction!: Subscription;

  constructor(
    private hobbiesInterestService: HobbiesInterestService,
    private router : Router,
    private route: ActivatedRoute,
    private headerService : HeaderService,
    private fb: FormBuilder,
    private utilService: UtilService
  ) {
    this.setFocus();
    this.formGroup = this.fb.group({
      patient:  new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      session_approach:  new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      clinical_progress:  new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      session_objective:  new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      state_of_mind:  new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      conducts_and_non_verbal_languages:  new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      observations:  new FormControl(null, [Validators.required, Validators.maxLength(250)]),
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
    this.headerService.setHeader({name:'track',type:'form'});
    this.utilService.set({name:'track', type:'form'});
    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.valid))
      .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.invalid))
      .subscribe(() => this.onFormInvalid());      
  }

  get form() { return this.formGroup.controls }

  ngOnDestroy() { this.$headerAction.unsubscribe(); }

  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
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
    this.hobbiesInterestService.addHobbiesInterest(this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['psychotherapy','tracking','table'])
    })
  }

  cancel(){
    this.router.navigate(['psychotherapy','tracking','table']);
  }

}
    