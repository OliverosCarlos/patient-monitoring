import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NEUROPSYCHO } from 'src/app/utils/setup/routes.enum'; 
import { FileSaverService } from 'ngx-filesaver';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';

//MODELS 
import { Medical_history } from 'src/app/models/early_stimulation.model'

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GenericSnackbarComponent } from 'src/app/utils/components/generic_snackbar/generic_snackbar.component';

import { Editor } from 'ngx-editor';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading, Table, TableToolbar, TableCellProperties, TableProperties, FontFamily, FontSize, FontColor, FontBackgroundColor, Link, BlockQuote, List, Indent, Underline, Alignment, HorizontalLine, RemoveFormat } from 'ckeditor5';

@Component({
  selector: 'app-early_stimulation_report-form-view',
  templateUrl: './early_stimulation_report-form-view.component.html',
  styleUrls: ['./early_stimulation_report-form-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EarlyStimulationReportFormViewComponent implements OnInit, OnDestroy, AfterViewInit {

  data!: Medical_history
  formGroup: FormGroup;
  $headerAction!: Subscription;

  @Input() nameForm: String = '';

  _id = ""
  updateFlag = false

  editor: Editor;
  html = '';


  title = 'angular';

  customColorPalette = [
    {
      color: '#ffffff',
      label: 'Blanco'
    },
    {
      color: '#000000',
      label: 'Negro'
    },
    {
      color: '#626567',
      label: 'Gris 1'
    },
    {
      color: '#cacfd2',
      label: 'Gris 2'
    },
    {
      color: '#f2f3f4',
      label: 'Gris 3'
    },
    {
      color: '#c0392b',
      label: 'Rojo'
    },
    {
      color: '#e67e22',
      label: 'Naranja'
    },
    {
      color: '#f1c40f',
      label: 'Amarillo'
    },
    {
      color: '#2ecc71',
      label: 'Verde 1'
    },
    {
      color: '#27ae60',
      label: 'Verde 2'
    },
    {
      color: '#3498db',
      label: 'Azul 1'
    },
    {
      color: '#2980b9',
      label: 'Azul 2'
    },
    {
      color: '#8e44ad',
      label: 'Morado'
    },
  ]

  public Editor = ClassicEditor;
  public config = {
      toolbar: [
        'undo', 'redo',
        '|',
        'heading',
        '|',
        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
        '|',
        'bold', 'italic', 'underLine',
        '|',
        'bulletedList', 'numberedList', 'outdent', 'indent','alignment',
        '|',
        'link', 'blockQuote',
        '|', 
        'horizontalLine', 'insertTable',
        '|',
        'removeFormat'
      ],
      plugins: [
          Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading, Table, TableToolbar, TableCellProperties, TableProperties, FontFamily, FontSize, FontColor, FontBackgroundColor, Link, BlockQuote, List, Underline, Indent, Alignment, HorizontalLine, RemoveFormat
      ],
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties' ],
        tableProperties: {
          borderColors: this.customColorPalette,
          backgroundColors: this.customColorPalette
      },

      // Set the palettes for table cells.
      tableCellProperties: {
          borderColors: this.customColorPalette,
          backgroundColors: this.customColorPalette
      }
      },
      fontColor: {
        colors: this.customColorPalette
      },
  }

  constructor(
    private headerService: HeaderService,
    private backendService : BackendService,
    private utilService: UtilService,
    private route: ActivatedRoute,
    private router : Router,
    private fileSaverService: FileSaverService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {
    this.data = {}
    this._id = this.route.snapshot.paramMap.get('medical_history_id')!

    this.formGroup = this.fb.group({
      medical_history: new FormControl(this.route.snapshot.paramMap.get('medical_history_id'), [Validators.required]),
      background: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      intelligence_assessment: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      attention: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      memory: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      language: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      praxias: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      gnosias: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      executive_functioning: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      mind_state: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      personality: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
      treatment: new FormControl(null, [Validators.required, Validators.maxLength(2000)]),
    });

    this.editor = new Editor();
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

        case 'update':
          this.update();
          break;
          
        default:
          break;
      }
    });

    this.utilService.set({name:'early-stimulation-report', type:'form'});
  }

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('medical_history_report_id')){
      this.getEarlyStimulationReportById(this.route.snapshot.paramMap.get('medical_history_report_id'));
      this.headerService.setHeader({name:'early-stimulation-report',type:'edit'});
      this.updateFlag = true
    }else{
      this.headerService.setHeader({name:'early-stimulation-report',type:'form'});
    }

    if(this.route.snapshot.paramMap.get('medical_history_id')){
      this.getMedicalHistoryById(this.route.snapshot.paramMap.get('medical_history_id'));
    }



    this.formGroup.statusChanges
    .pipe(
      filter(() => this.formGroup.valid))
    .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
    .pipe(
      filter(() => this.formGroup.invalid))
    .subscribe(() => this.onFormInvalid());
  }
  
  ngOnDestroy() {
    this.$headerAction!.unsubscribe();
    this.editor.destroy();
  }

  onFormValid() {
    if(this.updateFlag){
      this.headerService.sendInAction({action:'update', type: 'ready'});
    }else{
      this.headerService.sendInAction({action:'form', type: 'ready'});
    }
  }

  onFormInvalid() {
    if(this.updateFlag){
      this.headerService.sendInAction({action:'update', type: 'not-ready'});
    }else{
      this.headerService.sendInAction({action:'form', type: 'not-ready'});
    }
  }

  save(){
    this.backendService.create(NEUROPSYCHO.MEDICAL_HISTORY_REPORT, this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => {
        this.router.navigate(['../', 'main', 'clinical-history', 'early-stimulation']);
        this.showSuccess();
      }
    })
  }

  update(){
    this.backendService.update(NEUROPSYCHO.MEDICAL_HISTORY_REPORT, this.route.snapshot.paramMap.get('medical_history_report_id'), this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['../', 'main', 'clinical-history', 'early-stimulation', 'report-show', this.route.snapshot.paramMap.get('medical_history_report_id')])
    });
  }

  cancel(){
    if (this.updateFlag) {
      this.router.navigate(['../', 'main', 'clinical-history', 'early-stimulation', 'report-show', this.route.snapshot.paramMap.get('medical_history_report_id')])
    }else{
      this.router.navigate(['../', 'main', 'clinical-history', 'early-stimulation', 'show', this.route.snapshot.paramMap.get('medical_history_id')]);
    }
  }

  getMedicalHistoryById(id:any){
    if(id){
      this.backendService.getOneById(NEUROPSYCHO.MEDICAL_HISTORY ,id).subscribe({
        next: (v) => { this.data = v; },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  getEarlyStimulationReportById(id:any){
    if(id){
      this.backendService.getOneById(NEUROPSYCHO.MEDICAL_HISTORY_REPORT, id).subscribe({
        next: (v) => { this.setMedicalHistoryReport(v)},
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  setMedicalHistoryReport(medical_history_report:any){
    this.formGroup.get('medical_history')!.setValue(medical_history_report.medical_history);
    this.formGroup.get('background')!.setValue(medical_history_report.background);
    this.formGroup.get('intelligence_assessment')!.setValue(medical_history_report.intelligence_assessment);
    this.formGroup.get('attention')!.setValue(medical_history_report.attention);
    this.formGroup.get('memory')!.setValue(medical_history_report.memory);
    this.formGroup.get('language')!.setValue(medical_history_report.language);
    this.formGroup.get('praxias')!.setValue(medical_history_report.praxias);
    this.formGroup.get('gnosias')!.setValue(medical_history_report.gnosias);
    this.formGroup.get('executive_functioning')!.setValue(medical_history_report.executive_functioning);
    this.formGroup.get('mind_state')!.setValue(medical_history_report.mind_state);
    this.formGroup.get('personality')!.setValue(medical_history_report.personality);
    this.formGroup.get('treatment')!.setValue(medical_history_report.treatment);
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