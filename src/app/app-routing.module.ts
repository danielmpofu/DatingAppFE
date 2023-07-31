import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatchesComponent} from "./home/matches/matches.component";
import {ListsComponent} from "./home/lists/lists.component";
import {MessagesComponent} from "./home/messages/messages.component";
import {HomeComponent} from "./home/home/home.component";
import {AppComponent} from "./app.component";
import { AuthGuard } from './guards/auth.guard';
import { MembersComponent } from './home/members/members.component';
import { MemberDetailsComponent } from './home/member.details/member.details.component';

const routes: Routes = [
  {path:"",component:HomeComponent, },
  {path:"",component:HomeComponent,
runGuardsAndResolvers:'always',
canActivate: [AuthGuard],
children:[
  {path: 'matches', component: MatchesComponent},
  {path: 'lists', component: ListsComponent},
  {path:'members', component: MembersComponent},
  {path:'members/:id', component: MemberDetailsComponent},
  {path: 'messages', component: MessagesComponent},
]

},
  {path: "**", component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
