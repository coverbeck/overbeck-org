import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsByCountyTableComponent } from './totals-by-county-table.component';

describe('TotalsByCountyTableComponent', () => {
  let component: TotalsByCountyTableComponent;
  let fixture: ComponentFixture<TotalsByCountyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalsByCountyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalsByCountyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
