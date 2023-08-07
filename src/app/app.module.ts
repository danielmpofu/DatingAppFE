import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
//"./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css",
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './home/home/home.component';
import {NavComponent} from './components/nav/nav.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {ServerErrorComponent} from './errors/server-error/server-error.component';
import {MemberListCardComponent} from './home/members/member-list-card/member-list-card.component';
import {JwtInterceptor} from "./_interceptors/jwt.interceptor";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {MemberEditComponent} from './home/members/member-edit/member-edit.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {LoadingIndicatorsInterceptor} from "./_interceptors/loading-indicators.interceptor";
import {UploadPhotoComponent} from './home/members/upload-photo/upload-photo.component';

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
        ServerErrorComponent,
        MemberListCardComponent,
        MemberEditComponent,
        UploadPhotoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        SharedModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoadingIndicatorsInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
