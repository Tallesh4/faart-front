import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardTableReportComponent } from './standard-table-report.component';

describe('StandardTableReportComponent', () => {
  let component: StandardTableReportComponent;
  let fixture: ComponentFixture<StandardTableReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardTableReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardTableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
