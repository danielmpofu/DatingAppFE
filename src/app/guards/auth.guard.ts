import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  /**
   *
   */
      constructor(private accountService:AccountService, private toasterService:ToastrService) {  }

      canActivate(): Observable<boolean>  {
        return this.accountService.currentUser$.pipe(
         map(user =>{
         if(user){
            return true;
        }else{
           this.toasterService.error("You shall not pass");
           return false;
        }
      })
    );
    }}
