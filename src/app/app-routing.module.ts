import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatchesComponent} from "./home/matches/matches.component";
import {ListsComponent} from "./home/lists/lists.component";
import {MessagesComponent} from "./home/messages/messages.component";
import {HomeComponent} from "./home/home/home.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from './guards/auth.guard';
import {MembersComponent} from './home/members/members.component';
import {MemberDetailsComponent} from './home/member.details/member.details.component';
import {TestErrorsComponent} from "./errors/test-errors/test-errors.component";
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {ServerErrorComponent} from './errors/server-error/server-error.component';
import {MemberEditComponent} from "./home/members/member-edit/member-edit.component";
import {preventUnsavedChangesGuard} from "./guards/prevent-unsaved-changes.guard";
import {LandingComponent} from "./landing/landing.component";

const routes: Routes = [
  {path: "", redirectTo: "landing", pathMatch:"full"},
  {path: "landing", component: LandingComponent,},
  {
    path: "", component: HomeComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      //{path: '', component: HomeComponent},
      {path: 'matches', component: MatchesComponent},
      {path: 'lists', component: ListsComponent},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
      {path: 'members', component: MembersComponent},
      {path: 'members/:username', component: MemberDetailsComponent},
      {path: 'messages', component: MessagesComponent},
    ]
  },
  {path: "errors", component: TestErrorsComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "server-error", component: ServerErrorComponent},
  {path: "**", component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
