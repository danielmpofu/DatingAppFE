import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {Member} from "../models/member";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  accountBaseUrl: string = environment.apiUrl + "account/"

  constructor(private httpClient: HttpClient) {
  }

  login(loginData: any) {
    return this.httpClient.post<User>(this.accountBaseUrl + 'login', loginData)
      .pipe(
        map((response) => {
          const user: User = response;
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
  }

  isLoggedIn() {
    let user = localStorage.getItem('user');
    if (!user) return false;
    let userD = JSON.parse(user);
    this.currentUserSource.next(userD);
    return true;
  }

  signOut() {
    localStorage.clear();
    this.currentUserSource.next(null);
  }
}
