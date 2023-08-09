import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private accountService:AccountService,
              private router:Router) { }

  ngOnInit(): void {
    if(this.accountService.isLoggedIn()){
      this.router.navigateByUrl("/");
    }
  }

}
