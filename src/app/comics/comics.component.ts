import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements OnInit {

  apikey: string;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    const APIKEY = 'apikey';
    this.apikey = sessionStorage.getItem(APIKEY) || '';
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.data = {apikey: this.apikey};
    const matDialogRef = this.matDialog.open(DialogComponent, config);
    matDialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.apikey = data.apikey;
        sessionStorage.setItem(APIKEY, this.apikey);
      }
    });
  }

}
