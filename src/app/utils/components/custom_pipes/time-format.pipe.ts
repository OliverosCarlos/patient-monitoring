import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(hours: number): string {
    if (!hours) return '';

    let period = 'AM';

    if (hours >= 12) {
      period = 'PM';
      hours = hours > 12 ? hours - 12 : 12; // Convert 13-23 hours to 1-11 PM, keep 12 PM as is
    } else {
      hours = hours === 0 ? 12 : hours; // Convert 00:xx to 12:xx AM
    }

    return `${this.padZero(hours)}:${this.padZero(0)} ${period}`;
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
