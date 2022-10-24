import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialAllModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdService } from 'src/app/services/ad.service';

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialAllModule,
    MatNativeDateModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [AdService, CanActivateLogged],
  bootstrap: [AppComponent],
  exports: [
    // PatientFormViewComponent
  ]
})
export class AppModule { }
