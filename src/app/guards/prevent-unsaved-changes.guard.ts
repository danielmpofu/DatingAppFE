import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, CanDeactivateFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MemberEditComponent} from "../home/members/member-edit/member-edit.component";


export const preventUnsavedChangesGuard : CanDeactivateFn<MemberEditComponent> = (component) => {
  if(component.updateUserForm?.dirty){
    return confirm("Are you sure you want to leave this page? Any changes will be lost.")
  }
return true;
}
