import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BreadcrumbComponent } from 'src/app/utils/components/breadcrumb/breadcrumb.component';
import { MaterialAllModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { PatientFormViewComponent } from './components/psychotherapy/patient/patient-form-view/patient-form-view.component';

import { SideMenuComponent } from 'src/app/utils/components/side_menu/side_menu.component';
import { HeaderComponent } from 'src/app/utils/components/header/header.component';

import { ShowCRUDComponent } from 'src/app/utils/components/show-crud.component';
import { AdDirective } from 'src/app/utils/components/ad.directive';
import { AdService } from 'src/app/services/ad.service';
@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    HeaderComponent,
    SideMenuComponent,
    // PatientFormViewComponent
    ShowCRUDComponent,
    AdDirective,

  ],
  imports: [
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
  providers: [AdService],
  bootstrap: [AppComponent],
  exports: [
    // PatientFormViewComponent
  ]
})
export class AppModule { }
