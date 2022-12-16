import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWithSearchComponent } from './list-with-search.component';

describe('ListWithSearchComponent', () => {
  let component: ListWithSearchComponent;
  let fixture: ComponentFixture<ListWithSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWithSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWithSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
