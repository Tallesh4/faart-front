import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardTableToolsComponent } from './standard-table-tools.component';

describe('StandardTableToolsComponent', () => {
  let component: StandardTableToolsComponent;
  let fixture: ComponentFixture<StandardTableToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardTableToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardTableToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
