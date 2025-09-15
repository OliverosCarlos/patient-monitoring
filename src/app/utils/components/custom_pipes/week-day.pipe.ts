import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toWeekDay'
})
export class WeekDayPipe implements PipeTransform {

  private days: Record<number, string> = {
    0: 'domingo',
    1: 'lunes',
    2: 'martes',
    3: 'miércoles',
    4: 'jueves',
    5: 'viernes',
    6: 'sábado'
  };

  transform(value: Date | string | number, opciones?: { capitalize?: boolean, abbreviate?: boolean }): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Fecha inválida';

    let day = this.days[date.getDay()];

    if (opciones?.abbreviate) day = day.slice(0, 3);
    if (opciones?.capitalize) day = day.charAt(0).toUpperCase() + day.slice(1);

    return day;
  }
}
