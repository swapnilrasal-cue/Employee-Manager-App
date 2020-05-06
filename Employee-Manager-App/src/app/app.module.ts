import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateNewEmployeeComponent } from './create-new-employee/create-new-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HeaderComponent } from './header/header.component';
import { EditEmployeeDetailsComponent } from './Employee-Details/edit-employee-details/edit-employee-details.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateNewEmployeeComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    HeaderComponent,
    EditEmployeeDetailsComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
