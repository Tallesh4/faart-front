import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVisitDetailComponent } from './card-visit-detail.component';

describe('CardVisitDetailComponent', () => {
  let component: CardVisitDetailComponent;
  let fixture: ComponentFixture<CardVisitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardVisitDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVisitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
