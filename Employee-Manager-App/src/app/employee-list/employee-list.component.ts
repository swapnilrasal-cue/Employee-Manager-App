import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

   postsArray = [];
  constructor(private http : HttpClient) { }
  
  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.http
      .get('https://employee-manager-app-e42a3.firebaseio.com/users.json')
      .pipe(
        map(responseData => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.postsArray.push({ ...responseData[key], id: key });
            }
          }
          return this.postsArray;
        })
      )
      .subscribe(posts => {
        // ...
        console.log(posts);
      });
  }

}
