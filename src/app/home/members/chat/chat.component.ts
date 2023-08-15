import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../../services/message.service";
import {Message} from "../../../models/message";
import {AccountService} from "../../../services/account.service";
import {OutgoingMessage} from "../../../models/outgoingMessage";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() username?: string;
  @Input() messages: Message[] = [];
  myUsername: string = '';
  outgoingMessage: OutgoingMessage = {
    content: '',
    recipientUsername: ''
  };


  constructor(private messageService: MessageService, private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.outgoingMessage.recipientUsername = this.username!;
    //this.loadMessages();
    this.accountService.currentUser$.subscribe(
      {
        next: user => {
          if (user) {
            this.myUsername = user.username;
          }
        }
      }
    )
  }

  loadMessages() {
    if (this.username) {
      this.messageService.getMessageThread(this.username)
        .subscribe({
          next: value => {
            this.messages = value;
          }
        })
    }
  }

  sendMessage(): void {
    if (this.outgoingMessage.content !== '') {
      this.messageService.sendMessage(this.outgoingMessage).subscribe({
        next: response => {
          this.loadMessages();
        }
      })
    }

  }
}
