import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  errorMessage = new Subject<{display:boolean, show:string}>();
  successMessage = new Subject<{display:boolean, show:string}>();
  infoMessage = new Subject<{display:boolean, show:string}>();
  LoadingSpinner = new Subject<boolean>();

  constructor() { }

  
  HandleInfoMessage(message){
    this.infoMessage.next({display: true, show: message})
    setTimeout(() => {
      this.infoMessage.next({display: false, show: null})
    }, 3000);
  }

  HandleSuccessMessage(message){
    this.successMessage.next({display: true, show: message})
    setTimeout(() => {
      this.successMessage.next({display: false, show: null})
    }, 3000);
  }

  HandleErrorMessage(message){
    this.errorMessage.next({display: true, show: message})
    setTimeout(() => {
      this.errorMessage.next({display: false, show: null})
    }, 3000);
  }

  SpinnerActivate(){
    this.LoadingSpinner.next(true);
  }

  SpinnerDeactivate(){
    this.LoadingSpinner.next(false);
  }

}
