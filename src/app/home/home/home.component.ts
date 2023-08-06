import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: String = 'Dating App';
  users: any;

  constructor(private httpClient: HttpClient,
              public accountService:AccountService) {
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
