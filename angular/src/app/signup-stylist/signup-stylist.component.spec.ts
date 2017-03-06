import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStylistComponent } from './signup-stylist.component';

describe('SignupStylistComponent', () => {
  let component: SignupStylistComponent;
  let fixture: ComponentFixture<SignupStylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupStylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
