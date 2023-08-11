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
  initiated:boolean = false;
  currentUser:User|undefined;
  userParams:UserParams|undefined;

  constructor(private memberService: MemberService,private accountService:AccountService) {

  }

  ngOnInit() {
    console.log("members init");
    this.loadMembers();
  }
  getLoggedInUser(){
    this.accountService.currentUser$.pipe(take(1))
      .subscribe({
        next:user=>{
          if(user){
            this.userParams =
          }
        }
      });
  }

  loadMembers(): void {
    this.memberService.getMembers(this.pageNumber, this.pageSize,)
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
    console.log(this.pagination)
    console.log(event)
    if (this.pageNumber === event.page && !this.initiated) return;
    this.pageNumber = event.page;
    this.loadMembers();
    if(!this.initiated) this.initiated = true;
  }

}
