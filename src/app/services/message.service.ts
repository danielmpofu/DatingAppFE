import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {createPaginationParams, getPaginatedResults, getPaginationParams} from "./paginationHelper";
import {Message} from "../models/message";
import {Observable} from "rxjs";
import {Pagination} from "../models/pagination";
import {OutgoingMessage} from "../models/outgoingMessage";

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  messagesBaseUrl: string = environment.apiUrl + "message";

  constructor(private httpClient: HttpClient) {

  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationParams(pageNumber, pageSize);
    params = params.append("container", container);
    return getPaginatedResults<Message[]>(this.messagesBaseUrl, params, this.httpClient);
  }

  getMessageThread(username: string) {
    return this.httpClient.get<Message[]>(this.messagesBaseUrl + '/thread/' + username);
  }

  sendMessage(outgoingMessage: OutgoingMessage) {
    return this.httpClient.post(this.messagesBaseUrl, outgoingMessage);

  }
}
