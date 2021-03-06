import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 

//SERVICES
import { EmotionsService } from 'src/app/services/catalogs/emotions.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';

//models

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-emotion-update-view',
  templateUrl: './emotion-update-view.component.html',
  styleUrls: ['./emotion-update-view.component.scss']
})
export class EmotionUpdateViewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('firstInput', { static: false }) firstInput!: ElementRef;
  formGroup: FormGroup;
  @Input() modalConfigParent: any;
  @Input() nameForm: String = '';

  chip = {'name':'',color:'white'};

  $headerAction!: Subscription;

  constructor(
    private emotionsService: EmotionsService,
    private utilService: UtilService,
    private router : Router,
    private route: ActivatedRoute,
    private headerService : HeaderService,
    private fb: FormBuilder
  ) {
    this.setFocus();
    this.formGroup = this.fb.group({
      id: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      code: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      color: new FormControl(null, [Validators.required, Validators.maxLength(10)])

    });
  }
  ngAfterViewInit(): void {
    this.$headerAction = this.headerService.getOutAction().subscribe(data => {
      console.log(data)
      switch (data.action) {
        case 'update':
          this.update();
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
    this.headerService.setHeader({name:'symptom',type:'edit'});
    this.utilService.set({name:'symptom', type:'update'});
    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.valid))
      .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
      .pipe(
        filter(() => this.formGroup.invalid))
      .subscribe(() => this.onFormInvalid());

    if(this.route.snapshot.paramMap.get('emotion_id')){
      this.getEmotionById(this.route.snapshot.paramMap.get('emotion_id'));
    }
  }

  get paForm() { return this.formGroup.controls }
  
  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
  }

  onFormValid() {
    this.headerService.sendInAction({action:'update', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'update', type: 'not-ready'});
  }

  private setFocus() {
    setTimeout(() => this.firstInput.nativeElement !== undefined ? this.firstInput.nativeElement.focus() : '');
  }

  changeToUppercase(formName:string) {
    if(formName){
      const value = this.formGroup.get(formName)!.value;
      if (value) {
        this.formGroup.get(formName)!.setValue(value.toUpperCase());
        if(formName=='name')
        this.chip.name = this.formGroup.get(formName)!.value;
      }
    }
  }

  update(){
    this.emotionsService.updateEmotion(this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['catalogs','emotions','table'])
    });
  }

  getEmotionById(id:any){
    if(id){
      this.emotionsService.getEmotionById(id).subscribe({
        next: (v) => { this.setEmotion(v[0]) },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  setEmotion(emotion:any){
    this.formGroup.get('id')!.setValue(this.route.snapshot.paramMap.get('emotion_id'));
    this.formGroup.get('code')!.setValue(emotion.code);
    this.formGroup.get('name')!.setValue(emotion.name);
    this.formGroup.get('description')!.setValue(emotion.description);
    this.formGroup.get('color')!.setValue(emotion.color);
    this.chip.name = emotion.name;
    this.chip.color = emotion.color;
  }

  cancel(){
    this.router.navigate(['catalogs','emotions','form',this.route.snapshot.paramMap.get('emotion_id')]);
  }

  handleChangeComplete($event:any){
    this.chip.color = $event.color.hex;
    this.formGroup.get('color')!.setValue($event.color.hex);
  }

}
