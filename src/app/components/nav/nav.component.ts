import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  formData: any = {};
  knownAs: string | null = '';
  currentUserName: string  = '';
  photoUrl: string | undefined;

  constructor(public accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe({
      next: user => {
        if (user) {
          this.knownAs = user.knownAs;
          this.photoUrl = user.photoUrl;
          this.currentUserName = user.username;
        }
      }
    })
  }


  doLogin() {

    this.accountService.login(this.formData).subscribe({
      next: value => {
        //this.router.navigateByUrl('/members');
      },
      error: err => {
        this.toastr.error("Unable to login");
        console.log(err);
      }
    });
  }


  doLogout() {
    this.accountService.signOut();
    this.router.navigateByUrl('/');

  }
}
