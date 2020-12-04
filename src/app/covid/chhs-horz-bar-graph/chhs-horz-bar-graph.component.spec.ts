import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChhsHorzBarGraphComponent } from './chhs-horz-bar-graph.component';

describe('ChhsHorzBarGraphComponent', () => {
  let component: ChhsHorzBarGraphComponent;
  let fixture: ComponentFixture<ChhsHorzBarGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhsHorzBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChhsHorzBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
