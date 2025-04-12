import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostListener, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { filter, forkJoin } from 'rxjs';
import { NEUROPSYCHO, CATALOGS, SCHEDULER } from 'src/app/utils/setup/routes.enum';

//SERVICES
import { UtilService } from 'src/app/services/util.service';
import { BackendService } from 'src/app/services/backend.service';
import { HeaderService } from 'src/app/services/header.service';

//MODELS
import { MODELS } from 'src/app/utils/setup/model.setup';
import { Model } from 'src/app/models/vw-model.model';

interface Day {
  date: number;
  dayOfWeek: string;
  data?: any;
}

interface Appointment {
  year: number;
  month: number;
  day: number;
  hour: number;
  patient: any;
}


@Component({
  selector: 'app-scheduler-dashboard-view',
  templateUrl: './scheduler-dashboard-view.component.html',
  styleUrls: ['./scheduler-dashboard-view.component.scss']
})
export class SchedulerDashboardViewComponent implements OnInit, OnDestroy, AfterViewInit {
  model : Model;

  daysInMonth: Day[] = [];
  availableHours: number[] = [];
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  weekDaySelected : string | undefined = "";
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  currentDate = new Date();
  currentDay = this.currentDate.getDate();
  selectedDay = this.currentDay;
  currentMonth = this.currentDate.getMonth()+1
  availabilityByMonth: Record<string, Appointment[]> | [] = []
  daySelected:any = []
  hourSelected = 0

  constructor(
    private utilService : UtilService,
    private backendService : BackendService,
    private headerService : HeaderService,
  ) {
    this.model = MODELS.find(model => model.name == 'appointment')!;
  }

  ngOnInit() {
    this.headerService.setHeader({model: this.model, type: 'list'});
    this.utilService.set({name:'appointment', type:'list'});

    const year = 2025;
    const month = this.currentMonth;
    this.daysInMonth = this.getDaysInMonthWithWeekdays(year, month);
    
    this.getAvailabilityByDay(this.currentDay);
    this.weekDaySelected = this.daysInMonth.find((element) => element.date == this.currentDay)?.dayOfWeek;

    this.getAppointmentsByMonth()
  }
  
  ngAfterViewInit(): void {
  }

  getAll(data_search:any){

  }

  ngOnDestroy() {
  }

  getDay(day: any){
    console.log(day);
    this.daySelected = day
    // this.formGroup.get('day')!.setValue(day.date);
    // this.getAvailabilityByDay(day.date);
    // this.selectedDay = day.date;
  
    // this.weekDaySelected = this.daysInMonth.find((element) => element.date == day.date)?.dayOfWeek;
    // this.hourSelected = 0;
  }

  getAppointmentsByMonth(){
    // this.spinner.show('loading')
    this.backendService.getManyByParams(SCHEDULER.AVAILABILITY+'by_month/', {month: this.currentMonth}).subscribe({
      next: (v) => { 
        this.daysInMonth = this.buildMonthCalendar(this.daysInMonth, v);
        console.log(this.daysInMonth);
        
         },
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

  monthAdjustments(month: any){
    
    const indexDay: number = this.weekdays.findIndex(item => item === month[0].dayOfWeek);
    let auxDays : any[] = []
    this.weekdays.slice(0, indexDay).forEach(function (value: any) {
      auxDays.push({ date: 0, dayOfWeek: value });
    });

    return [...auxDays, ...month]
    
  }

  getAvailabilityByDay(day: number){
    // this.spinner.show('loading')
    this.backendService.getManyByParams(SCHEDULER.AVAILABILITY+'by_day/', {month: this.currentMonth, day}).subscribe({
      next: (v) => {  this.availableHours = this.getAvailabilityHours(v)},
      error: (e) => console.error(e),
      complete: () => console.log("completed")
    });
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
    this.getAppointmentsByMonth()
    
    if(this.currentMonth == this.currentDate.getMonth()+1){
      this.currentDay = this.currentDate.getDate();
    }else{
      this.currentDay = 1
    }
  }

  handlePreviousMonth(){
    this.currentMonth = this.currentMonth-1;
    this.daysInMonth = this.getDaysInMonthWithWeekdays(2025, this.currentMonth);
    this.getAppointmentsByMonth()

    if(this.currentMonth == this.currentDate.getMonth()+1){
      this.currentDay = this.currentDate.getDate();
    }else{
      this.currentDay = 1
    }
  }

  groupByDay(appointment: Appointment[]): any {
    const grupos: Record<string, Appointment[]> = appointment.reduce((grupo:any, cita) => {
      const fecha = `${cita.year}-${cita.month}-${cita.day}`;
      if (!grupo[fecha]) {
          grupo[fecha] = [];
      }
      grupo[fecha].push(cita);
      return grupo;
  }, {});

  return Object.keys(grupos).map(fecha => {
      const [año, mes, dia] = fecha.split('-');
      return {
          day: dia,
          date: fecha,
          groupedData: grupos[fecha]
      };
  });
  }

  buildMonthCalendar(daysInMonth: any, availabilityByMonth: any){
    return daysInMonth.map( (item: any) => {
      return {...item, data: availabilityByMonth.filter( (date:any) => date.day==item.date).sort((a:any, b:any) => a.hour - b.hour) }
    })
  }

  getTypeCount(data: any[], type: string){
    return data ? data.filter(item => item.patient.type.id == type).length : 0;
  }

}
