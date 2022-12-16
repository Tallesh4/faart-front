import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateRegistrationFormPageComponent } from './create-update-registration-form.component';

describe('CreateUpdateRegistrationFormPageComponent', () => {
  let component: CreateUpdateRegistrationFormPageComponent;
  let fixture: ComponentFixture<CreateUpdateRegistrationFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateRegistrationFormPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateRegistrationFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
