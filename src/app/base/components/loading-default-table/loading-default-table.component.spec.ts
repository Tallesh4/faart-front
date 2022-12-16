import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingDefaultTabletComponent } from './loading-default-table.component';

describe('LoadingDefaultTabletComponent', () => {
	let component: LoadingDefaultTabletComponent;
	let fixture: ComponentFixture<LoadingDefaultTabletComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ LoadingDefaultTabletComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingDefaultTabletComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
