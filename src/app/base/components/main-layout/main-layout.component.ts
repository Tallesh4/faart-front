import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

	public showMenu: boolean = false;

	constructor() { }

	ngOnInit(): void {
		this.showMenu = true;
	}

}
