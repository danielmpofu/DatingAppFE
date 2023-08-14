import {Component, OnInit} from '@angular/core';
import {Member} from "../../models/member";
import {MemberService} from "../../services/member.service";
import {Pagination} from "../../models/pagination";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  predicate: string = 'liked';
  members: Member[] | undefined = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  pagination: Pagination | undefined;


  constructor(private memberService: MemberService) {
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe({
        next: response => {
          this.members = response.result;
          this.pagination = response.pagination
        }
      })
  }

  pageChangedEvent(event: any): void {
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadLikes();
    }

  }


}
