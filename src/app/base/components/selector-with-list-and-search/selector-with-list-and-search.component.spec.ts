import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorWithListAndSearchComponent } from './selector-with-list-and-search.component';

describe('SelectorWithListAndSearchComponent', () => {
  let component: SelectorWithListAndSearchComponent;
  let fixture: ComponentFixture<SelectorWithListAndSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorWithListAndSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorWithListAndSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
