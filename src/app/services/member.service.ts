import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../models/member";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.apiUrl + "users/";

  constructor(private httpClient: HttpClient) {
  }

  getMembers() {
    return this.httpClient.get<Member[]>(this.baseUrl,this.getHttpHeaders());
  }

  getMember(username: string) {
    return this.httpClient.get<Member>(this.baseUrl+username,this.getHttpHeaders());
  }

  getHttpHeaders() {
    let userString = localStorage.getItem('user');
    if (!userString) return;
    let user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: 'bearer ' + user.token
      })
    }


  }


}
