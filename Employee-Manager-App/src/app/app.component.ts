import { Component, OnInit } from '@angular/core';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Employee-Manager-App';
  constructor(private userService : UserService){}

 ngOnInit(){
   this.userService.autoLogin();
 }

}
