import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

  userStatus = false;
  isAuthenticated = false;
  isAllowed = false;
  private userSubscription : Subscription;
  constructor(private userService: UserService) { }
  

  ngOnInit(): void {
    // this.checkIsAllowed();
    
    this.userSubscription = this.userService.userAuthentication.subscribe(userAuthentication => {
      this.isAuthenticated = false;
      if(userAuthentication){
        this.isAuthenticated = true;
        let userStatus = JSON.parse(localStorage.getItem('Data'));

      }

      console.log(!userAuthentication);
      console.log(!!userAuthentication);
      console.log(userAuthentication);
    })
  }
  
  // checkIsAllowed(){
  //   let test = this.userService.getCurrentLoggedInUserInfo();
  //   if(test.role == 'Admin'){
  //     this.isAllowed = true;
  //   }
  //   else{
  //     this.isAllowed=false;
  //   }
  // }
   
  onLogoutUser(){
    this.userService.onLogout();
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}
