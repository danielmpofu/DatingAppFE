import {Component, OnInit} from '@angular/core';
import {Member} from "../../models/member";
import {MemberService} from "../../services/member.service";
import {Pagination} from "../../models/pagination";
import {User} from "../../models/user";
import {AccountService} from "../../services/account.service";
import {take} from "rxjs";
import {UserParams} from "../../models/userParams";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[] | undefined = [];
  pagination: Pagination | undefined;
  pageNumber: number = 1;
  pageSize: number = 5;
  initiated: boolean = false;
  currentUser: User | undefined;
  userParams: UserParams | undefined;

  genderList = [
    {value:"male",display:"Male"},
    {value:"female",display:"Female"},
  ];

  resetFilters(){
    if(this.currentUser){
      this.userParams = new UserParams(this.currentUser);
      //re load all the users
      this.loadMembers();
    }
  }

  constructor(private memberService: MemberService, private accountService: AccountService) {
    this.getLoggedInUser();
  }

  ngOnInit() {
    console.log("members init");
    this.loadMembers();
  }

  getLoggedInUser() {
    this.accountService.currentUser$.pipe(take(1))
      .subscribe({
        next: user => {
          if (user) {
            this.currentUser = user;
            this.userParams = new UserParams(user);
          }
        }
      });
  }

  loadMembers(): void {
    if (!this.userParams) return;
    this.memberService.getMembers(this.userParams)
      .subscribe({
        next: value => {
          if (value) {
            this.members = value.result;
            this.pagination = value.pagination;
            this.initiated = true;
          }
        }
      })
  }

  pageChanged(event: any): void {
    if (this.userParams && this.userParams.pageNumber === event.page) {
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }

}
