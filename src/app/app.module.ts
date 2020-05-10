import { HttpClient, HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"
import { MatButtonModule } from "@angular/material/button"
import { MatListModule } from "@angular/material/list"
import { MatMenuModule } from "@angular/material/menu"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatToolbarModule } from "@angular/material/toolbar"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ChartsModule } from "ng2-charts"
import { MarkdownModule } from "ngx-markdown"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { ChhsGraphComponent } from "./chhs-graph/chhs-graph.component"
import { ComicsComponent } from "./comics/comics.component"
import { CovidComponent } from "./covid/covid.component"
import { HomeComponent } from "./home/home.component"
import { RsoComponent } from "./rso/rso.component"

@NgModule({
  declarations: [
    AppComponent,
    RsoComponent,
    HomeComponent,
    ComicsComponent,
    CovidComponent,
    ChhsGraphComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
