import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AnagrammerService } from './anagrammer.service';

@Component({
  selector: 'app-anagrammer',
  templateUrl: './anagrammer.component.html',
  styleUrls: ['./anagrammer.component.scss']
})
export class AnagrammerComponent implements OnInit {
  public anagramForm;
  public dataSource: Array<string> = [];

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
