import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenGuard } from "src/app/base/guards/token.guard";

@Component({
	selector: "app-index",
	templateUrl: "./index.page.html",
	styleUrls: ["./index.page.scss"]
})
export class IndexPage implements OnInit {

	data: any[] = [];



	constructor(
		private tokenGuard: TokenGuard,
		private router: Router,
	) { }
	ngOnInit() {

		for (let i = 0; i < 50; i++) {

			this.data.push({
				value: `item ${i}`
			})
		}

		if (!this.tokenGuard.canActivate()) {
			this.router.navigate(["login"]);
		}
	}

}
