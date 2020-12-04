import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChhsGraphComponent } from './chhs-graph.component';

describe('SantaCruzCovidComponent', () => {
  let component: ChhsGraphComponent;
  let fixture: ComponentFixture<ChhsGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChhsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
