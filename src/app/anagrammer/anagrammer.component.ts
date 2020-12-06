import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { AnagrammerService } from './anagrammer.service';

@Component({
  selector: 'app-anagrammer',
  templateUrl: './anagrammer.component.html',
  styleUrls: ['./anagrammer.component.scss']
})
export class AnagrammerComponent implements OnInit {
  public anagramForm;
  public dataSource: Array<string> = [];
  public displayedColumns: string[] = ['index'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private formBuilder: FormBuilder, private service: AnagrammerService) {
    this.anagramForm = this.formBuilder.group({
      input: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(data) {
    this.service.getAnagrams(data.input).subscribe(resp => {
      this.dataSource = resp;
    });
    this.anagramForm.reset();
  }

}
