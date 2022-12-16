import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToRemoveCashbackParameterComponent } from './modal-to-remove-association.component';

describe('ModalToRemoveCashbackParameterComponent', () => {
  let component: ModalToRemoveCashbackParameterComponent;
  let fixture: ComponentFixture<ModalToRemoveCashbackParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalToRemoveCashbackParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalToRemoveCashbackParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
