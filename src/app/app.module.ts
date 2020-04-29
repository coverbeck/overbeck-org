import { HttpClient, HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { NoopAnimationsModule } from "@angular/platform-browser/animations"
import { MarkdownModule } from "ngx-markdown"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HomeComponent } from "./home/home.component"
import { RsoComponent } from "./rso/rso.component"

@NgModule({
  declarations: [
    AppComponent,
    RsoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
