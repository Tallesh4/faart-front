import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'loading-default-table',
	templateUrl: './loading-default-table.component.html',
	styleUrls: ['./loading-default-table.component.scss']
})
export class LoadingDefaultTabletComponent implements OnInit {

	@Input() count: number = 5;
	@Input() appearance: any = "line"; // line or circle
	@Input() loading: boolean = false;
	@Input() height: string = "10px";

	theme = {
		height: "15px"
	}

	constructor() { }

	ngOnInit(): void {
		this.theme.height = this.height;
	}

}
