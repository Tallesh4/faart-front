import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityAmountComponent } from './quantity-amount.component';

describe('QuantityAmountComponent', () => {
  let component: QuantityAmountComponent;
  let fixture: ComponentFixture<QuantityAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
