import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonExcelComponent } from './button-excel.component';

describe('ButtonExcelComponent', () => {
	let component: ButtonExcelComponent;
	let fixture: ComponentFixture<ButtonExcelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ButtonExcelComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ButtonExcelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
