import {Component, OnInit} from '@angular/core';
import {Member} from "../../models/member";
import {MemberService} from "../../services/member.service";
import {Pagination} from "../../models/pagination";

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

  constructor(private memberService: MemberService) {
  }

  ngOnInit() {
    console.log("members init");
    this.loadMembers();
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
