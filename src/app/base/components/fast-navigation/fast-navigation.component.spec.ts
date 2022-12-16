import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastNavigationComponent } from './fast-navigation.component';

describe('FastNavigationComponent', () => {
	let component: FastNavigationComponent;
	let fixture: ComponentFixture<FastNavigationComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ FastNavigationComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FastNavigationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
