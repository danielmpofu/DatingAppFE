import { Component, OnInit } from '@angular/core';
import {Message} from "../../models/message";
import {Pagination} from "../../models/pagination";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages? : Message[];
  pagination?:Pagination;
  container:string = "Unread";
  pageNumber:number = 1;
  pageSize:number = 5;
  constructor(private messageService: MessageService) {

  }

  loadMessages(){
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container)
      .subscribe({
        next:results=>{
          this.messages = results.result;
          this.pagination = results.pagination;
        }
      })
  }
  ngOnInit(): void {
    this.loadMessages();
  }

  onPageChanged(event:any){
    if(this.pageNumber === event.page){
      this.pageNumber= event.page;
      this.loadMessages();
    }
  }

}
