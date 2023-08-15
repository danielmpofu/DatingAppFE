import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Member} from "../../models/member";
import {MemberService} from "../../services/member.service";
import {ActivatedRoute} from "@angular/router";
import {TabDirective, TabsetComponent} from "ngx-bootstrap/tabs";
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message";


@Component({
  selector: 'app-member.details',
  templateUrl: './member.details.component.html',
  styleUrls: ['./member.details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  member: Member | undefined;
  @ViewChild('memberTabs') memberTabs?: TabsetComponent;
  activeTab?: TabDirective;
  messages: Message[] = [];

  constructor(private memberService: MemberService,
              private messageService: MessageService,
              private route: ActivatedRoute) {

  }

  onActivationTab(tab: TabDirective) {
    this.activeTab = tab;
    if (this.activeTab.heading === 'Messages') {
      this.loadMessages();
    }
  }

  loadMessages() {
    this.messageService.getMessageThread(this.member?.userName!)
      .subscribe({
        next: value => {
          this.messages = value;
        }
      })

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
