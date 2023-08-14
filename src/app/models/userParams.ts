import {User} from "./user";

export class UserParams{
  gender:string;
  minAge:number = 18;
  maxAge:number = 99;
  pageSize:number = 10;
  pageNumber:number = 1;
  predicate:string = 'liked';

  constructor(user:User) {
    this.gender = user.gender === "female"?"male":"female";

  }

}
