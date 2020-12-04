import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HospitalizationComponent } from './hospitalization.component';

describe('HospitalizationComponent', () => {
  let component: HospitalizationComponent;
  let fixture: ComponentFixture<HospitalizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
