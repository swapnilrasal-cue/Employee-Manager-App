import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators} from '@angular/forms';
import { UserService } from '../Services/user.service';
import { User } from '../Models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  users: User[] = [];
  EditUserForm : FormGroup;
  genders = ['Male' , 'Female' , 'Others'];
  userDetails:User;

  isLoading = false;

  constructor(private userService : UserService,private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserDetail();
    this.userService.usersChanged.subscribe((users) => {
      this.isLoading = false;
      this.users = users;
    });

    const loggedInUser = this.userService.getCurrentLoggedInUserInfo();
    console.log("loggedInUser "+loggedInUser);

    // if (!loggedInUser) {
    //   this.router.navigate(['/login']);
    // }
    
    let newname = loggedInUser.name;
    let newemail = loggedInUser.email;
    let newstatus = loggedInUser.status;
    let newrole = loggedInUser.role;
    let newpassword = loggedInUser.password;
    let newdate = loggedInUser.date;
    let newgender = loggedInUser.gender;
    
    this.EditUserForm  = new FormGroup({
      'name': new FormControl(newname,[Validators.required ]),
      'email': new FormControl(newemail, [Validators.required, Validators.email]),
      'status': new FormControl(newstatus,Validators.required), 
      'role' : new FormControl(newrole,Validators.required),
      'password': new FormControl(newpassword,Validators.required),
      'date': new FormControl(newdate,Validators.required),
      'gender': new FormControl(newgender,Validators.required),
   });
  }

  onEditUser() {
      this.isLoading = true;

      this.userService.updateUser(this.EditUserForm.value).subscribe((users) => {
        this.userService.usersChanged.next(users);
        this.isLoading = false;
        this.router.navigate(['/EmployeeList']);

      });
    }
  }

