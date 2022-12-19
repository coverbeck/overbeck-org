import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LochlomondComponent } from './lochlomond.component';

describe('LochlomondComponent', () => {
  let component: LochlomondComponent;
  let fixture: ComponentFixture<LochlomondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LochlomondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LochlomondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
