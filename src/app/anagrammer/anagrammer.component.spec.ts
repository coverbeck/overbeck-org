import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagrammerComponent } from './anagrammer.component';

describe('AnagrammerComponent', () => {
  let component: AnagrammerComponent;
  let fixture: ComponentFixture<AnagrammerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnagrammerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagrammerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
