import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../../models/member";
import {MemberService} from "../../../services/member.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-member-list-card',
  templateUrl: './member-list-card.component.html',
  styleUrls: ['./member-list-card.component.css']
})
export class MemberListCardComponent implements OnInit {

  @Input() member: Member | undefined;

  constructor(private memberService: MemberService
    , private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe(
      {
        next: value => {
          this.toastr.success("You have liked " + member.knownAs)
        }
      })
  }

}
