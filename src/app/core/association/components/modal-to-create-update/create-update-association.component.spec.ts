import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateAssociationPageComponent } from './create-update-association.component';

describe('CreateUpdateAssociationPageComponent', () => {
  let component: CreateUpdateAssociationPageComponent;
  let fixture: ComponentFixture<CreateUpdateAssociationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateAssociationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateAssociationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
