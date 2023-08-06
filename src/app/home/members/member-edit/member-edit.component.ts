import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {Member} from "../../../models/member";
import {User} from "../../../models/user";
import {MemberService} from "../../../services/member.service";
import {take} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: Member | undefined;
  user: User | undefined;

  @ViewChild("updateMemberForm") updateUserForm: NgForm| undefined;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.updateUserForm?.dirty){
      $event.returnValue = true;
    }
  };

  constructor(private accountService: AccountService,
              private toastrService: ToastrService,
              private memberService: MemberService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.user = user;
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe(
      {
        next: member => {
          this.member = member;
        }
      }
    )
  }

  saveMemberUpdates() {
    this.memberService.updateMember(this.updateUserForm?.value).subscribe({
      next: value=>{
        this.toastrService.success("Profile has been updated");
        this.updateUserForm?.reset();
        this.loadMember();
      }, error: error=>{
        this.toastrService.error("Unable to update profile");
        // this.updateUserForm?.reset();
      }
    })

  }
}
