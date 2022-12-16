import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SearchFilterInterface } from "src/app/base/components/filter/filter.interface";
import Calendar from "src/utils/Calendar";
import { HomeDailyInterface, HomeMouthIndicators } from "./home.interface";
import { HomeService } from "./home.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.page.html",
	styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {

	constructor(
		private homeService: HomeService,
	) { }

	loadingDailyIndicators: boolean = false;
	loadingMouthIndicators: boolean = false;

	dailyIndicators: any = {
		users: 0,
		forms: 0,
	}

	mouthIndicators: any = {
		association: 0,
		responsible: 0,
	}


	ngOnInit(): void {
		this.getDailyIndicators();
		this.getMouthIndicators();
	}

	getDailyIndicators() {
		this.loadingDailyIndicators = true;

		this.homeService.getDailyIndicators().subscribe(response => {
			this.dailyIndicators = response;
			this.loadingDailyIndicators = false;
		})
	}

	getMouthIndicators() {
		this.loadingMouthIndicators = true;

		this.homeService.getMouthIndicators().subscribe(response => {
			this.mouthIndicators = response;
			this.loadingMouthIndicators = false;
		})
	}

}
