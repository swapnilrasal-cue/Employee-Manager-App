import { Component, OnInit } from '@angular/core';
// import { User } from '../Models/user.model';
import { UserService } from '../Services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-employee',
  templateUrl: './create-new-employee.component.html',
  styleUrls: ['./create-new-employee.component.css']
})
export class CreateNewEmployeeComponent implements OnInit {

  genders = ['Male' , 'Female' , 'Others'];
  createNewUserForm: FormGroup;
  isLoading = false;
  error : string = null;
    constructor(private userService : UserService,private router : Router) { }

  ngOnInit(): void {
    this.createNewUserForm = new FormGroup({      
       'name': new FormControl(null,[Validators.required ]),
       'email': new FormControl(null, [Validators.required, Validators.email]),
       'status': new FormControl('Activate'), 
       'role' : new FormControl('Employee'),
       'password': new FormControl(null,Validators.required),
       'date': new FormControl(null),
       'gender': new FormControl('Male'),

    });
  }

  onCreateNewUser(){
    this.isLoading = true;
    const newUser = new User(
      this.createNewUserForm.value.name,
      this.createNewUserForm.value.email,
      this.createNewUserForm.value.status,
      this.createNewUserForm.value.role,  
      this.createNewUserForm.value.password,
       this.createNewUserForm.value.date,
       this.createNewUserForm.value.gender,
    )
    // const email = this.createNewUserForm.value.email;
    // const name = this.createNewUserForm.value.name;
    // const status = this.createNewUserForm.value.status;
    // const password = this.createNewUserForm.value.password;
    // const date = this.createNewUserForm.value.date;
    // const gender = this.createNewUserForm.value.gender;
    // const role =this.createNewUserForm.value.role;
    this.userService.onCreateUser(newUser).subscribe(ResponseData =>{
      // console.log(ResponseData);
      this.isLoading = false;
      this.router.navigate(['/EmployeeList']);
    }, Error => {
      // console.log(Error);
      this.error = "Error Occured";
      this.isLoading = false;
    }
    );
    this.createNewUserForm.reset();
  }
  
}
