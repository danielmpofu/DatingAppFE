import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: String = 'DatingAppFE';
  users: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get("http://localhost:5108/api/v1/Users")
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log("request has completed");
        }
      })
  }


}
