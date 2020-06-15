import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

const APIKEY = 'apikey';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  apikey: string;

  constructor(private matDialog: MatDialog, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.apikey = sessionStorage.getItem(APIKEY) || '';
    if (!this.apikey) {
      this.promptForKey();
    }
    this.httpClient.get(`/api/comics?comic=adam&apikey=${this.apikey}`).subscribe(
      null,
      (error) => {
        if (error.status === 403) {
          this.promptForKey();
        }
      }
    );
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
        sessionStorage.setItem(APIKEY, this.apikey);
      }
    });
  }
}
