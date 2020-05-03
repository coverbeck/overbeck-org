import { HttpClient, HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { FlexLayoutModule } from "@angular/flex-layout"
import { MatMenuModule } from "@angular/material/menu"
import { BrowserModule } from "@angular/platform-browser"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { MarkdownModule } from "ngx-markdown"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { ComicsComponent } from "./comics/comics.component"
import { HomeComponent } from "./home/home.component"
import { RsoComponent } from "./rso/rso.component"

@NgModule({
  declarations: [
    AppComponent,
    RsoComponent,
    HomeComponent,
    ComicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    NoopAnimationsModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
