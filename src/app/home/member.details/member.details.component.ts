import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../models/member";
import {MemberService} from "../../services/member.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-member.details',
  templateUrl: './member.details.component.html',
  styleUrls: ['./member.details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  member: Member | undefined;

  constructor(private memberService: MemberService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    var username = this.route.snapshot.paramMap.get("username");
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;

      }
    })
  }
}
