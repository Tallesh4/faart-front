import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AssociationPage } from "./association.page";

describe("AssociationPage", () => {
	let component: AssociationPage;
	let fixture: ComponentFixture<AssociationPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ AssociationPage ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AssociationPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
