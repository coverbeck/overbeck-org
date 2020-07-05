import { Component, Input, OnInit } from '@angular/core';
import { HospitalData } from '../../shared/models/cali-model';

@Component({
  selector: 'app-hospitalization',
  templateUrl: './hospitalization.component.html',
  styleUrls: ['./hospitalization.component.scss']
})
export class HospitalizationComponent implements OnInit {

  @Input()
  public hospitalData: HospitalData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
