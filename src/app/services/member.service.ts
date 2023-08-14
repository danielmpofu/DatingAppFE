import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../models/member";
import {map, Observable, of} from "rxjs";
import {PaginatedResult} from "../models/pagination";
import {UserParams} from "../models/userParams";
import {User} from "../models/user";
import {AccountService} from "./account.service";
import {createPaginationParams, getPaginatedResults} from "./paginationHelper";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  members: Member[] = [];
  membersBaseUrl: string = environment.apiUrl + "users/";
  likesBaseUrl: string = environment.apiUrl + "likes/";

  constructor(private httpClient: HttpClient, private accountService: AccountService) {
  }


  getMembers(userParams: UserParams):Observable<PaginatedResult<Member[]>> {
    //if (this.members.length != 0) return of(this.members);
    return getPaginatedResults<Member[]>(this.membersBaseUrl,
      createPaginationParams(userParams), this.httpClient);
  }



  addLike(username: string) {
    return this.httpClient.post(this.likesBaseUrl+username, {})
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {

    let user: User | null;
    this.accountService.currentUser$.subscribe({
      next: us => {
        if(us)  user = us;
      }
    });
    let userParams: UserParams = new UserParams(user!);
    userParams.predicate = predicate;
    userParams.pageNumber = pageNumber;
    userParams.pageSize = pageSize;
    let params: HttpParams = createPaginationParams(userParams);
    // return this.httpClient.get<Member[]>(this.likesBaseUrl ,{params: params});
    return getPaginatedResults<Member[]>(this.likesBaseUrl+"user-likes", params,this.httpClient);
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
