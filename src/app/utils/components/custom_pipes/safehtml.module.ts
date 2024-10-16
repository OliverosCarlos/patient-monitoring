import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from 'src/app/utils/components/custom_pipes/safehtml.pipe'

@NgModule({
  declarations: [SafeHtmlPipe],
  exports: [SafeHtmlPipe]
})
export class safehtmlModule{}