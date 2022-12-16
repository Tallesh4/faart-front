import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResponsiblePage } from "./responsible.page";

describe("ResponsiblePage", () => {
	let component: ResponsiblePage;
	let fixture: ComponentFixture<ResponsiblePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ResponsiblePage ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ResponsiblePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
