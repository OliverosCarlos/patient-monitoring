import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from 'src/app/utils/services/auth.interceptor';

import { MaterialAllModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdService } from 'src/app/services/ad.service';

import { CanActivateLogged } from 'src/app/utils/guards/mainGuard';
import { SessionExpiredComponent } from './components/public/session-expired/session-expired.component';
@NgModule({
  declarations: [
    AppComponent,
    SessionExpiredComponent,
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
  providers: [
    AdService,
    CanActivateLogged,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    // PatientFormViewComponent
  ]
})
export class AppModule { }
