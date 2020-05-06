import { Component, OnInit } from '@angular/core';
// import { User } from '../Models/user.model';
import { UserService } from '../Services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/user.model';

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
    constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.createNewUserForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
       'name': new FormControl(null,[Validators.required ]),
       'status': new FormControl('Activate'), 
       'password': new FormControl(null,Validators.required),
       'date': new FormControl(null),
       'gender': new FormControl('Male'),
       'role' : new FormControl('Employee')
    });
  }

  onCreateNewUser(){
    this.isLoading = true;
    const newUser = new User(
       this.createNewUserForm.value.email,
       this.createNewUserForm.value.name,
       this.createNewUserForm.value.status,
       this.createNewUserForm.value.password,
       this.createNewUserForm.value.date,
       this.createNewUserForm.value.gender,
       this.createNewUserForm.value.role  
    )
    // const email = this.createNewUserForm.value.email;
    // const name = this.createNewUserForm.value.name;
    // const status = this.createNewUserForm.value.status;
    // const password = this.createNewUserForm.value.password;
    // const date = this.createNewUserForm.value.date;
    // const gender = this.createNewUserForm.value.gender;
    // const role =this.createNewUserForm.value.role;
    this.userService.onCreateUser(newUser).subscribe(ResponseData =>{
      console.log(ResponseData);
      this.isLoading = false;
    }, Error => {
      // console.log(Error);
      this.error = "Error Occured";
      this.isLoading = false;
    }
    );
    this.createNewUserForm.reset();
  }
  
}
