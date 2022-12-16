import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultExportButtonComponent } from './default-export-button.component';

describe('DefaultExportButtonComponent', () => {
  let component: DefaultExportButtonComponent;
  let fixture: ComponentFixture<DefaultExportButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultExportButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultExportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
