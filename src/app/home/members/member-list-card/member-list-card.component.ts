import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../../models/member";

@Component({
  selector: 'app-member-list-card',
  templateUrl: './member-list-card.component.html',
  styleUrls: ['./member-list-card.component.css']
})
export class MemberListCardComponent implements OnInit {

  @Input() member: Member | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
