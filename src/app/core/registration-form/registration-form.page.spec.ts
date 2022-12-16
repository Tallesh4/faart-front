import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RegistrationFormPage } from "./registration-form.page";

describe("RegistrationFormPage", () => {
	let component: RegistrationFormPage;
	let fixture: ComponentFixture<RegistrationFormPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ RegistrationFormPage ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RegistrationFormPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
