import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveProductComponent } from './remove-product.component';

describe('RemoveProductComponent', () => {
  let component: RemoveProductComponent;
  let fixture: ComponentFixture<RemoveProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
