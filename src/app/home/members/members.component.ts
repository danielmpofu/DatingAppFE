import { Component, OnInit } from '@angular/core';
import {Member} from "../../models/member";
import {MemberService} from "../../services/member.service";
import {Pagination} from "../../models/pagination";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members:Member[] =[];
  pagination: Pagination | undefined;
  pageNumber:number = 1;

  constructor(private memberService:MemberService) { }

  ngOnInit() {
    console.log("members init");
    this.getMembers();
  }

  getMembers(){
    this.memberService.getMembers()
      .subscribe({
        next: value => {
          this.members = value;
        }
      })
  }

}
