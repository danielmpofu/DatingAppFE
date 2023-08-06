import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import {TabsModule} from "ngx-bootstrap/tabs";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {NgxSpinnerModule} from "ngx-spinner";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale-party' })
  ],

  exports:[
    ToastrModule,TabsModule, BsDropdownModule, NgxSpinnerModule
  ]
})
export class SharedModule { }
