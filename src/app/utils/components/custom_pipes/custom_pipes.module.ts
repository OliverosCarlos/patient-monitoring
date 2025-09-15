import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from './time-format.pipe';
import { WeekDayPipe } from './week-day.pipe';

@NgModule({
  declarations: [TimeFormatPipe, WeekDayPipe],
  exports: [TimeFormatPipe, WeekDayPipe],
  imports: [CommonModule]
})
export class CustomPipesModule {}

