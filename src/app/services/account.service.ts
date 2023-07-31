import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new BehaviorSubject<User|null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  accountBaseUrl: string = "http://localhost:5108/api/v1/Account/";

  constructor(private httpClient: HttpClient) {
  }

  login(loginData: any) {
    return this.httpClient.post<User>(this.accountBaseUrl + 'login', loginData)
      .pipe(
        map((response) => {
          const user = response;
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
  }

  isLoggedIn() {
    let user: string | null = localStorage.getItem('user');
    return user === null;
  }


}
