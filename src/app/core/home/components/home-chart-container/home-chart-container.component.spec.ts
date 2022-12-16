import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChartContainerComponent } from './home-chart-container.component';

describe('HomeChartContainerComponent', () => {
  let component: HomeChartContainerComponent;
  let fixture: ComponentFixture<HomeChartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeChartContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
