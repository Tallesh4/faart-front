import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateResponsiblePageComponent } from './create-update-responsible.component';

describe('CreateUpdateResponsiblePageComponent', () => {
  let component: CreateUpdateResponsiblePageComponent;
  let fixture: ComponentFixture<CreateUpdateResponsiblePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateResponsiblePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateResponsiblePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
