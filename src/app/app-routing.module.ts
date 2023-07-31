import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatchesComponent} from "./home/matches/matches.component";
import {ListsComponent} from "./home/lists/lists.component";
import {MessagesComponent} from "./home/messages/messages.component";
import {HomeComponent} from "./home/home/home.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path: 'matches', component: MatchesComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'messages', component: MessagesComponent},
  {path: "**", component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
