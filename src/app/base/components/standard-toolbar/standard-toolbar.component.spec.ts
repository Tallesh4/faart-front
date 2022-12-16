import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardToolbarComponent } from './standard-toolbar.component';

describe('StandardToolbarComponent', () => {
  let component: StandardToolbarComponent;
  let fixture: ComponentFixture<StandardToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
