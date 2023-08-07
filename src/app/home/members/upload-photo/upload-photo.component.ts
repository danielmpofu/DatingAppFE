import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../../models/member";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../../environments/environment";
import {User} from "../../../models/user";
import {AccountService} from "../../../services/account.service";
import {take} from "rxjs";

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {


  @Input() member: Member | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  ngOnInit(): void {
    this.initialiseUploader();
  }


  constructor(private userService: AccountService) {
    this.userService.currentUser$
      .pipe(take(1))
      .subscribe({
        next: user => {
          if (user) this.user = user;
        }
      })
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initialiseUploader() {
    if(!this.user) return;
    this.uploader = new FileUploader({
      url: this.baseUrl + "users/upload-photo",
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (fileItem, response, status,headers)=>{
      if(response){
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
      }
    }

  }



}
