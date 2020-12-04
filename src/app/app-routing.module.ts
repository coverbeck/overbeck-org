import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnagrammerComponent } from './anagrammer/anagrammer.component';
import { ComicsComponent } from './comics/comics.component';
import { CovidComponent } from './covid/covid.component';
import { HomeComponent } from './home/home.component';
import { MarkdownComponent } from './rso/markdown/markdown.component';
import { RsoComponent } from './rso/rso.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'rso', component: RsoComponent},
  { path: 'rso/:markdown', component: MarkdownComponent },
  { path: 'comics', component: ComicsComponent},
  { path: 'covid', component: CovidComponent},
  { path: 'anagrammer', component: AnagrammerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
