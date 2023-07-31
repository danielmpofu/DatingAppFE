import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//"./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import { MatchesComponent } from './home/matches/matches.component';
import { ListsComponent } from './home/lists/lists.component';
import { MessagesComponent } from './home/messages/messages.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import { MembersComponent } from './home/members/members.component';
import { MemberDetailsComponent } from './home/member.details/member.details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    MatchesComponent,
    ListsComponent,
    MessagesComponent,
    MembersComponent,
    MemberDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
