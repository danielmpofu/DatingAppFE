import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Member} from "../models/member";
import {map, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MemberService {

    members: Member[] = [];
    membersBaseUrl:string = environment.apiUrl + "users/";

    constructor(private httpClient: HttpClient) {
    }

    getMembers() {
        if (this.members.length != 0) return of(this.members);
        return this.httpClient.get<Member[]>(this.membersBaseUrl);
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

    setMainPhoto(photoId: number):Observable<any|undefined> {
        return this.httpClient.put(`${this.membersBaseUrl}set-main-photo/${photoId}`, {})
    }

    deletePhoto(id: number) {
        return  this.httpClient.delete(this.membersBaseUrl+'delete-photo/'+id);
    }

}
