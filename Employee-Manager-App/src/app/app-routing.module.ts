import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateNewEmployeeComponent } from './create-new-employee/create-new-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EditEmployeeDetailsComponent } from './Employee-Details/edit-employee-details/edit-employee-details.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthenticationGuard } from './Guards/authentication.guard';


const routes: Routes = [
  { path: '', redirectTo: '/EmployeeDetails', pathMatch: 'full'},
  {  path:'login' , component:LoginComponent },
  {  path:'CreateNewUser' , component:CreateNewEmployeeComponent , canActivate : [AuthenticationGuard]},
  {  path:'EmployeeDetails' , component:EmployeeDetailsComponent , canActivate : [AuthenticationGuard],
     children : [
       { path : "EditEmployeeDetails" , component:EditEmployeeDetailsComponent}
     ]
  },
  {  path:'EmployeeList' , component:EmployeeListComponent ,canActivate : [AuthenticationGuard]},
  {  path:"header" , component:HeaderComponent },
  {  path:"**" , component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
