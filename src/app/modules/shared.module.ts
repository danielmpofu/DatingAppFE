import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {TabsModule} from "ngx-bootstrap/tabs";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {NgxSpinnerModule} from "ngx-spinner";
import {FileUploadModule} from "ng2-file-upload";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'line-scale-party' })
  ],

  exports:[
    ToastrModule,
    FileUploadModule,
    TabsModule,
    BsDropdownModule,
    NgxSpinnerModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
