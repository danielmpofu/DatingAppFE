import {Component, OnInit} from '@angular/core';
import {Member} from "../../models/member";
import {MemberService} from "../../services/member.service";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  predicate: string = 'liked';
  members: Member[] | undefined = [];

  constructor(private  memberService:MemberService) {
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(){
    this.memberService.getLikes(this.predicate)
      .subscribe({
        next: response=>{
          this.members = response;
        }
      })
  }

}
