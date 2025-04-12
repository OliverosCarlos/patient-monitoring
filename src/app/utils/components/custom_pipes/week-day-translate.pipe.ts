import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekDayTranslate'
})
export class WeekDayTranslatePipe implements PipeTransform {

  transform(englishDay: string | undefined ): string {
    console.log(englishDay);
    
    if (!englishDay) return '';
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    switch (englishDay) {
      case "Sunday":
        return "Domingo";
      case "Monday":
        return "Lunes";
      case "Tuesday":
        return "Martes";
      case "Wednesday":
        return "Miércoles";
      case "Thursday":
        return "Jueves";
      case "Friday":
        return "Viernes";
      case "Saturday":
        return "Sábado"
      default:
        return "";
    }
  }

}
