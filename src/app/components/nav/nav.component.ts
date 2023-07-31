import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  formData: any={};

  constructor(public accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  doLogin() {

    this.accountService.login(this.formData).subscribe({
      next: value => {
        this.router.navigateByUrl('/');
        console.log(value);
      },
      error: err => {
        this.toastr.error("Unable to login");
        console.log(err);
      }
    });
  }


}
