import { TestBed } from "@angular/core/testing";

import { RenewPasswordService } from "./renew-password.service";

describe("RenewPasswordService", () => {
	let service: RenewPasswordService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RenewPasswordService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});
});
