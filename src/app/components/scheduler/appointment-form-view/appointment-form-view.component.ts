import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { SCHEDULER } from '../../../utils/setup/routes.enum';

//SERVICES
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';
import { UtilService } from 'src/app/services/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetupService } from 'src/app/utils/services/setup.service';

//MODELS
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

import { GenericSnackbarComponent } from 'src/app/utils/components/generic_snackbar/generic_snackbar.component';

interface Day {
  date: number;
  dayOfWeek: string;
}

@Component({
  selector: 'app-appointment-form-view',
  templateUrl: './appointment-form-view.component.html',
  styleUrls: ['./appointment-form-view.component.scss']
})
export class AppointmentFormViewComponent implements OnInit, AfterViewInit {

  $headerAction!: Subscription;

  formGroup;
  daysInMonth: Day[] = [];
  availableHours: number[] = [];
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weekDaySelected : string | undefined = "";
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  currentDate = new Date();
  currentDay = this.currentDate.getDate();
  selectedDay = this.currentDay;
  currentMonth = this.currentDate.getMonth()+1
  hourSelected = 0

  submitBtnState = true

  model : Model;

  constructor(
    private backendService : BackendService,
    private router : Router,
    private fb: FormBuilder,
    private headerService : HeaderService,
    private utilService : UtilService,
    private setupService : SetupService,
    private _snackBar: MatSnackBar,
  ) {
    this.model = MODELS.find(model => model.name == 'appointment')!;
    this.formGroup = this.fb.group({
      year: new FormControl<number|null>(2025, [Validators.required, Validators.min(1)]),
      month: new FormControl<number|null>(this.currentDate.getMonth()+1, [Validators.required, Validators.min(1)]),
      day: new FormControl<number|null>(0, [Validators.required, Validators.maxLength(1)]),
      hour: new FormControl<number|null>(null, [Validators.required, Validators.maxLength(5)]),
      patient_id: new FormControl<number|null>(null, [Validators.required, Validators.maxLength(5)]),
    });
  }

  ngOnInit(): void {
    this.headerService.setHeader({model: this.model, type: 'form'});
    this.utilService.set({name:'appointment', type:'form'});
    // this.setupService.setViewType("card_content");

    const year = 2025;
    const month = this.currentMonth; // Enero
    this.daysInMonth = this.getDaysInMonthWithWeekdays(year, month);

    this.getAvailabilityByDay(this.currentDay);
    this.weekDaySelected = this.daysInMonth.find((element) => element.date == this.currentDay)?.dayOfWeek;

    this.formGroup.statusChanges
    .pipe(
      filter(() => this.formGroup.valid))
    .subscribe(() => this.onFormValid());

    this.formGroup.statusChanges
    .pipe(
      filter(() => this.formGroup.invalid))
    .subscribe(() => this.onFormInvalid());
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

  save(){
    this.backendService.create(SCHEDULER.APPOINTMENTS, this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => {
        this.router.navigate(['../','main','scheduler','dashboard']);
        this.showSuccess();
      }
    })
  }

  cancel(){
    this.router.navigate(['../','main','scheduler','dashboard']);
  }

  getAllAppointments(){
    // this.spinner.show('loading')
    this.backendService.getManyByParams(SCHEDULER.AVAILABILITY+'by_month/', {month: this.currentMonth}).subscribe({
      next: (v) => { console.log(v)},
      error: (e) => console.error(e),
      complete: () => console.log("completed")
    });
  }

  getAvailabilityByDay(day: number){
    // this.spinner.show('loading')
    this.backendService.getManyByParams(SCHEDULER.AVAILABILITY+'by_day/', {month: this.currentMonth, day}).subscribe({
      next: (v) => {  this.availableHours = this.getAvailabilityHours(v)},
      error: (e) => console.error(e),
      complete: () => console.log("completed")
    });
  }

  getDaysInMonthWithWeekdays(year: number, month: number): Day[] {
    const date = new Date(year, month - 1, 1);
    const days: Day[] = [];


    while (date.getMonth() === month - 1) {
        days.push({ date: date.getDate(), dayOfWeek: this.weekdays[date.getDay()] });
        date.setDate(date.getDate() + 1);
    }

    return this.monthAdjustments(days);
  }

  onFormValid() {
    this.headerService.sendInAction({action:'form', type: 'ready'});
  }

  onFormInvalid() {
    this.headerService.sendInAction({action:'form', type: 'not-ready'});
  }

  getDay(day: any){

    this.formGroup.get('day')!.setValue(day.date);
    this.getAvailabilityByDay(day.date);
    this.selectedDay = day.date;
  
    this.weekDaySelected = this.daysInMonth.find((element) => element.date == day.date)?.dayOfWeek;
    this.hourSelected = 0;
  }

  getHour(hour: number){
    this.formGroup.get('hour')!.setValue(hour);
    this.hourSelected = hour;
  }

  monthAdjustments(month: any){
    
    const indexDay: number = this.weekdays.findIndex(item => item === month[0].dayOfWeek);
    let auxDays : any[] = []
    this.weekdays.slice(0, indexDay).forEach(function (value: any) {
      auxDays.push({ date: 0, dayOfWeek: value });
    });

    return [...auxDays, ...month]
    
  }

  requestAppointment(){
    this.backendService.create(SCHEDULER.APPOINTMENTS, this.formGroup.value).subscribe({
      next: (v) => { console.log(v); },
      error: (e) => console.error(e),
      complete: () => {
        console.log("completed");
      }
    })
  }

  getAvailabilityHours(bookedHours: any[]): number[] {
    //create list of hours and convert to set
    const bookedHoursToRemove = new Set(bookedHours.map(date => date.hour ));
    //remove booked hours from the hours range to define by the psicho
    const availableHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].filter((hour: number) => !bookedHoursToRemove.has(hour));

    return availableHours;
  }

  handleNextMonth(){
    this.currentMonth = this.currentMonth+1;
    this.daysInMonth = this.getDaysInMonthWithWeekdays(2025, this.currentMonth);
    console.log(this.daysInMonth);
    
    if(this.currentMonth == this.currentDate.getMonth()+1){
      this.currentDay = this.currentDate.getDate();
    }else{
      this.currentDay = 1
    }
  }

  handlePreviousMonth(){
    this.currentMonth = this.currentMonth-1;
    this.daysInMonth = this.getDaysInMonthWithWeekdays(2025, this.currentMonth);

    if(this.currentMonth == this.currentDate.getMonth()+1){
      this.currentDay = this.currentDate.getDate();
    }else{
      this.currentDay = 1
    }
  }

  setPatient($ev:any){
    console.log($ev.id);
    
    this.formGroup.get('patient_id')!.setValue($ev.id);
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
