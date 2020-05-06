import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isLoading = false;
  error : string = null;

  constructor( private userService : UserService , private router :Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]), 
       'password': new FormControl(null,Validators.required),
    });
  }

  Login(){
    this.isLoading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.userService.onLogin(email , password).subscribe(ResponseData =>{
      alert("successfully login");
      this.isLoading = false;
this.router.navigate(['/EmployeeDetails'])
    }, Error => {
      console.log(Error);
      this.error = "Error Occured";
      this.isLoading = false;
    }
    );
    this.loginForm.reset();
  }

}
