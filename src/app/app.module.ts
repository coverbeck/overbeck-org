import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { MarkdownModule } from 'ngx-markdown';
import { AnagrammerComponent } from './anagrammer/anagrammer.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComicsComponent } from './comics/comics.component';
import { ChhsGraphComponent } from './covid/chhs-graph/chhs-graph.component';
import { ChhsHorzBarGraphComponent } from './covid/chhs-horz-bar-graph/chhs-horz-bar-graph.component';
import { CovidComponent } from './covid/covid.component';
import { HospitalizationComponent } from './covid/hospitalization/hospitalization.component';
import { TotalsByCountyTableComponent } from './covid/totals-by-county-table/totals-by-county-table.component';
import { DialogComponent } from './dialog/dialog.component';
import { ElectionsComponent } from './elections/elections.component';
import { HomeComponent } from './home/home.component';
import { MarkdownComponent } from './rso/markdown/markdown.component';
import { RsoComponent } from './rso/rso.component';
import { LineGraphComponent } from './shared/line-graph/line-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    RsoComponent,
    HomeComponent,
    ComicsComponent,
    CovidComponent,
    ChhsGraphComponent,
    ChhsHorzBarGraphComponent,
    MarkdownComponent,
    AnagrammerComponent,
    TotalsByCountyTableComponent,
    DialogComponent,
    LineGraphComponent,
    HospitalizationComponent,
    ElectionsComponent
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
