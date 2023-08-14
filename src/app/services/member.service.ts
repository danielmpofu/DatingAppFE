import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../models/member";
import {map, Observable, of} from "rxjs";
import {PaginatedResult} from "../models/pagination";
import {UserParams} from "../models/userParams";
import {User} from "../models/user";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  members: Member[] = [];
  membersBaseUrl: string = environment.apiUrl + "users/";
  likesBaseUrl: string = environment.apiUrl + "likes/";

  constructor(private httpClient: HttpClient, private accountService: AccountService) {
  }

  createPaginationParams(userParams: UserParams): HttpParams {
    let params = new HttpParams();
    /*
    *  gender:string;
  minAge:number = 18;
  maxAge:number = 99;
  pageSize:number = 10;
  pageNumber:number = 1;
    * */

    params = params.append("pageSize", userParams.pageSize);
    params = params.append("pageNumber", userParams.pageNumber);
    params = params.append("gender", userParams.gender);
    params = params.append("maxAge", userParams.maxAge);
    params = params.append("minAge", userParams.minAge);
    params = params.append("predicate", userParams.predicate);

    return params;
  }

  getMembers(userParams: UserParams) {

    //if (this.members.length != 0) return of(this.members);
    return this.getPaginatedResults<Member[]>(this.membersBaseUrl,
      this.createPaginationParams(userParams));
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
    let params: HttpParams = this.createPaginationParams(userParams);
    // return this.httpClient.get<Member[]>(this.likesBaseUrl ,{params: params});
    return this.getPaginatedResults<Member[]>(this.likesBaseUrl+"user-likes", params);
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
