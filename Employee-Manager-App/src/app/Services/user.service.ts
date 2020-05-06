import { Injectable } from '@angular/core';
import { User } from '../Models/user.model'
import { EmailValidator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData} from '../Models/user.model';
import { Authentication } from '../Models/authentication.model'
import { BehaviorSubject, from } from 'rxjs';
import { tap , take , exhaustMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  apiUrl="https://employee-manager-app-e42a3.firebaseio.com/";
  apiKey="AIzaSyBYMBNI0O07KEuNpRULJMs09k0fX5gnbP0";
  userAuthentication = new BehaviorSubject<Authentication>(null);
 
  constructor(private http: HttpClient) { }
  // email : string, name : string , status : string , password : string , date : Date , gender : string , role : string
  onCreateUser(newUser : User){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apiKey,
      {
        email : newUser.email,
        password : newUser.password,
        returnSecureToken: true
        // name : name,
        // status : status,
        // date : date,
        // gender : gender,
      }
      )
      .pipe(tap(responseData =>{
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        );
      } ),
        take(1), exhaustMap((responseData) => {
        this.users.push(newUser);
        return this.http.post(this.apiUrl + 'users.json', newUser);
      })

      );    
  }

  onLogin(email : string, password : string ){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.apiKey,
      {
        email : email,
        password : password,
        returnSecureToken: true 
      }
      )
      .pipe(tap(responseData =>{
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        );
      } ));;    
  }

  private handleAuthentication(email: string, userId: string, token: string, expirationIn: number) {
    const expiredDate = new Date(new Date().getTime() + expirationIn * 1000);
    const user = new Authentication(
      email, 
      userId, 
      token, 
      expiredDate
      );
    this.userAuthentication.next(user);
    localStorage.setItem('Data', JSON.stringify(user));
    console.log(localStorage.getItem('Data'));
  }

   onLogout(){
    localStorage.removeItem('Data');
    this.userAuthentication.next(null);
   }
  
}
