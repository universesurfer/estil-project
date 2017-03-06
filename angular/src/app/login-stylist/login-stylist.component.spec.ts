import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStylistComponent } from './login-stylist.component';

describe('LoginStylistComponent', () => {
  let component: LoginStylistComponent;
  let fixture: ComponentFixture<LoginStylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
