import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {TabsModule} from "ngx-bootstrap/tabs";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {NgxSpinnerModule} from "ngx-spinner";
import {FileUploadModule} from "ng2-file-upload";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule,
    FileUploadModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale-party' })
  ],

  exports:[
    ToastrModule,FileUploadModule,TabsModule, BsDropdownModule, NgxSpinnerModule
  ]
})
export class SharedModule { }
