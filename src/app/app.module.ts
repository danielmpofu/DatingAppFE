import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
//"./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home/home.component';
import {NavComponent} from './components/nav/nav.component';
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from './components/register/register.component';
import {MatchesComponent} from './home/matches/matches.component';
import {ListsComponent} from './home/lists/lists.component';
import {MessagesComponent} from './home/messages/messages.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {CommonModule} from "@angular/common";
import {MembersComponent} from './home/members/members.component';
import {MemberDetailsComponent} from './home/member.details/member.details.component';
import {SharedModule} from './modules/shared.module';
import {TestErrorsComponent} from './errors/test-errors/test-errors.component';
import {HttpInterceptor} from "./_interceptors/http.interceptor";
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

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
        MemberDetailsComponent,
        TestErrorsComponent,
        NotFoundComponent,
        ServerErrorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        SharedModule

    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
