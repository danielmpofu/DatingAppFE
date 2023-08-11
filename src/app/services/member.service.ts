import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../models/member";
import {map, Observable, of} from "rxjs";
import {PaginatedResult} from "../models/pagination";
import {UserParams} from "../models/userParams";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  members: Member[] = [];
  membersBaseUrl: string = environment.apiUrl + "users/";

  constructor(private httpClient: HttpClient) {
  }

  createHttpParams(userParams: UserParams): HttpParams {
    let params = new HttpParams();
    params = params.append("pageSize", userParams.pageSize);
    params = params.append("pageNumber", userParams.pageNumber);

    return params;
  }

  getMembers(userParams: UserParams) {

    //if (this.members.length != 0) return of(this.members);
    this.getPaginatedResults<Member[]>(this.membersBaseUrl,
      this.createHttpParams(userParams));
  }

  getPaginatedResults<T>(url: string, params: HttpParams) {

    let paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
    //if (this.members.length != 0) return of(this.members);
    return this.httpClient.get<T>(url, {observe: 'response', params: params})
      .pipe(map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }

        return paginatedResult;
      }));
  }

  getMember(username: string) {
    let member: Member | undefined = this.members.find(mem => mem.userName === username);
    if (member) return of(member);
    return this.httpClient.get<Member>(this.membersBaseUrl + "by_username/" + username);
  }

  getHttpHeaders() {
    let userString = localStorage.getItem('user');
    if (!userString) return;
    let user = JSON.parse(userString);
    console.log(user);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token
      })
    }
  }

  updateMember(member: Member) {
    return this.httpClient.put(this.membersBaseUrl, member).pipe(map(
      () => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member}
      }
    ));
  }

  setMainPhoto(photoId: number): Observable<any | undefined> {
    return this.httpClient.put(`${this.membersBaseUrl}set-main-photo/${photoId}`, {})
  }

  deletePhoto(id: number) {
    return this.httpClient.delete(this.membersBaseUrl + 'delete-photo/' + id);
  }

}
