import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuOptionsComponent } from './sub-menu-options.component';

describe('SubMenuOptionsComponent', () => {
	let component: SubMenuOptionsComponent;
	let fixture: ComponentFixture<SubMenuOptionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ SubMenuOptionsComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SubMenuOptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
