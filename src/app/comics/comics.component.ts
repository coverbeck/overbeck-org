import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

const APIKEY = 'apikey';

interface ScrapeElement {
  id: number;
  style: string;
  elementType: string;
}

interface ImageData {
  url: string;
  style: string;
  caption?: string;
  id: number;
}

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  apikey: string;
  images: Array<ImageData> = [];

  constructor(private matDialog: MatDialog, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.apikey = localStorage.getItem(APIKEY) || '';
    if (!this.apikey) {
      this.promptForKey();
    }
    this.httpClient.get<Array<ScrapeElement>>(`/api/portal?apikey=${this.apikey}`).subscribe(
      (scrapeElements) => {
        this.images = scrapeElements
          .filter(s => s.elementType === 'image')
          .map(s => {
            return { url: this.urlForElement(s), style : s.style, id: s.id };
          });
        const textElements = scrapeElements.filter(s => s.elementType === 'text');
        textElements.forEach(t => this.httpClient.get(this.urlForElement(t), {responseType: 'text'}).subscribe(
          (text => {
            // Lame; assume caption is for image with one less id number
            this.images.find(i => i.id === (t.id - 1)).caption = text;
          }),
          (error => console.log(error))
        ));
        },
      (error) => {
        if (error.status === 403) {
          this.promptForKey();
        }
      }
    );
  }

  private urlForElement(scrapeElement: ScrapeElement) {
    return `/api/portal/${scrapeElement.id}?apikey=${this.apikey}`;
  }

  private promptForKey() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.data = { apikey: this.apikey };
    const matDialogRef = this.matDialog.open(DialogComponent, config);
    matDialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.apikey = data.apikey;
        localStorage.setItem(APIKEY, this.apikey);
      }
    });
  }
}
