import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderDefaultIndicatorComponent } from './header-default-indicator.component';

describe('HeaderDefaultIndicatorComponent', () => {
  let component: HeaderDefaultIndicatorComponent;
  let fixture: ComponentFixture<HeaderDefaultIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDefaultIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDefaultIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
