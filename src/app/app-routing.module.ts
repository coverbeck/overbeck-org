import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { ComicsComponent } from "./comics/comics.component"
import { CovidComponent } from "./covid/covid.component"
import { HomeComponent } from "./home/home.component"
import { RsoComponent } from "./rso/rso.component"


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'rso', component: RsoComponent},
  { path: 'comics', component: ComicsComponent},
  { path: 'covid', component: CovidComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
