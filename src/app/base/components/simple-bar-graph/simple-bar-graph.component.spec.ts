import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBarGraphComponent } from './simple-bar-graph.component';

describe('SimpleBarGraphComponent', () => {
  let component: SimpleBarGraphComponent;
  let fixture: ComponentFixture<SimpleBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleBarGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
