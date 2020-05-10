import { async, TestBed } from "@angular/core/testing"
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar"
import { RouterTestingModule } from "@angular/router/testing"
import { AppComponent } from "./app.component"

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MatToolbar,
        MatToolbarRow
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'overbeck'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('overbeck');
  });

});
