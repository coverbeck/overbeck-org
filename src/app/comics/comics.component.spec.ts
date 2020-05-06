import { HttpClientTestingModule } from "@angular/common/http/testing"
import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { ComicsComponent } from "./comics.component"

describe('ComicsComponent', () => {
  let component: ComicsComponent;
  let fixture: ComponentFixture<ComicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
