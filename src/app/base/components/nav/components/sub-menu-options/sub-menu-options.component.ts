import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { TokenGuard } from "src/app/base/guards/token.guard";


@Component({
	selector: 'sub-menu-options',
	templateUrl: './sub-menu-options.component.html',
	styleUrls: ['./sub-menu-options.component.scss']
})
export class SubMenuOptionsComponent implements OnInit {

	@Input() completeName = "";
	@Input() notification = false;

	isWorking = false;

	constructor(
		private tokenGuard: TokenGuard,
		private router: Router,
	) {
	}

	configs() {
		this.notification = !this.notification;
	}

	ngOnInit(): void {
		this.working()
	}

	working() {
		setTimeout(() => {
			let response = localStorage.getItem('isWorking')
			if (response === 'true') {
				this.isWorking = true
			} else if (response === 'false') {
				this.isWorking = false
			}
		}, 3000);

	}

	workSession() {
		let initialWorking = {
			date: new Date(),
			lat: 0.0,
			lng: 0.0,
			identifier: "0"
		}

		let finishWorking = {
			date: new Date(),
			lat: 0.0,
			lng: 0.0,
			identifier: "1"
		}

	}

	logout() {
		this.notification = !this.notification;
		this.tokenGuard.clearTokens();
		localStorage.removeItem("user");
		this.router.navigate(["/login"]);
	}
}
