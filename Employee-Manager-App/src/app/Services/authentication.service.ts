import { Injectable } from '@angular/core';
import { SignupResposeData, LoginResponseData, Authentication } from '../Models/authentication.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { User } from '../Models/user.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userAuthentication = new BehaviorSubject<Authentication>(null);
  private tokenExpirationTimer : any;
  usersChanged = new Subject<any>();
  userDetails:User;
  apiUrl="https://employee-manager-app-e42a3.firebaseio.com/";
  apiKey="AIzaSyBYMBNI0O07KEuNpRULJMs09k0fX5gnbP0";


  constructor(private http:HttpClient,
    private router:Router,
    private messageService: NotificationService) { }

    onCreateUser(userData){
      this.messageService.SpinnerActivate();
      this.messageService.HandleSuccessMessage("Registration Process Started");
      return this.http.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apiKey,{
              email: userData.email,
              password:	userData.password,
              returnSecureToken: "true"
            }
          ).subscribe(
               (response:SignupResposeData) => {
              this.addUser(response, userData)
            },
            err =>{
              this.DisplayErrorMessage(err);
            });
    }
  
    addUser(response:SignupResposeData, userData:User){
      return this.http.put(this.apiUrl+"/users/"+response.localId+".json",userData)
      .subscribe(
        resolve => {
          this.messageService.HandleSuccessMessage("User Created Successful");
          this.router.navigate(['/EmployeeList']);
        }, 
        (err) => {
          this.DisplayErrorMessage(err);
        }); 
    }
  
    onLogin(userCredentials:{email:string, password:string}){
      localStorage.clear();
      // this.todoService.activeUser = ""
      this.userDetails = null;
      return this.http.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.apiKey,
        {
          email: userCredentials.email,
          password:	userCredentials.password,
          returnSecureToken: "true"
        }
      ).subscribe(
        (response:LoginResponseData) => 
        {
            localStorage.setItem('localId', response.localId);
            // this.router.navigate(['/user/'+response.localId]);
            this.router.navigate(['EmployeeDetails']);
          },
        (err) => 
        {
          this.DisplayErrorMessage(err);
        });
    }
  
    getUserDetails(id){
      this.http.get(this.apiUrl+"/users/"+id+".json")
      .subscribe(
        (result:User) => {
          this.userDetails = result;
          this.messageService.HandleSuccessMessage("Welcome Back")
        }, 
        (err) => {
          this.DisplayErrorMessage(err);
      });
    }
  
  
    updateUser(user){
      this.userDetails = user;
      return this.http.put(this.apiUrl+"/users/.json",this.userDetails)
      .subscribe(
        (resolve) => {
          this.messageService.HandleSuccessMessage("Changes Saved Successfully");
          this.router.navigate(['/user',localStorage.getItem('localId'),'todo','private'])
        }, 
        (err) => {
          this.DisplayErrorMessage(err);
        }); 
    }
  
    DisplayErrorMessage(error){
      console.log("Some Error Occurred")
      console.log(error);
      this.messageService.HandleErrorMessage(error.error.error.message);
      this.messageService.SpinnerDeactivate();
    }

    
  autoLogin(){
    const userData : {
      email :string,
      id : string,
      _token :string,
      _tokenExpirationDate : string
    } = JSON.parse(localStorage.getItem('Data'));
    if(!userData){
      return;
    }

    const loadedUser = new Authentication(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token){
      this.userAuthentication.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
      this.autoLogout(expirationDuration); 
    }
  }

   onLogout(){
    localStorage.removeItem('Data');
    this.router.navigate(['login'])
    this.userAuthentication.next(null);
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    } 
    this.tokenExpirationTimer = null; 
  }

   autoLogout(expirationDuration : number){
    console.log("Tokken Expires in : " +expirationDuration);
    this.tokenExpirationTimer =  setTimeout(()=>{
       this.onLogout();
     },expirationDuration
     );
   }

}
