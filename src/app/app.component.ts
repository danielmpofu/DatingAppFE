import {Component, OnInit} from '@angular/core';
// import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'Dating App';
  users: any;

  constructor() {
  }

  ngOnInit(): void {
    // this.httpClient.get("http://localhost:5108/api/v1/Users")
    //   .subscribe({
    //     next: (response) => {
    //       this.users = response;
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //     complete: () => {
    //       console.log("request has completed");
    //     }
    //   })
  }

}
