import { Component, OnInit } from '@angular/core';
import {Member} from "../../models/member";
import {MemberService} from "../../services/member.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members:Member[] =[];
  constructor(private memberService:MemberService) { }

  ngOnInit(): void {
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
