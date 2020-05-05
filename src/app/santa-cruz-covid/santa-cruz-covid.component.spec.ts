import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { SantaCruzCovidComponent } from "./santa-cruz-covid.component"

describe('SantaCruzCovidComponent', () => {
  let component: SantaCruzCovidComponent;
  let fixture: ComponentFixture<SantaCruzCovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SantaCruzCovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SantaCruzCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
