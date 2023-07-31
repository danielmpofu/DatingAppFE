import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData:any ={}
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

  }

  doRegister():void{

  }

}
