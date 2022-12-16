import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RenewPasswordPage } from "./renew-password.page";

describe("RenewPasswordPage", () => {
	let component: RenewPasswordPage;
	let fixture: ComponentFixture<RenewPasswordPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ RenewPasswordPage ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RenewPasswordPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
