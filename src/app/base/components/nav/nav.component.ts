import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

	isLoggedIn: boolean = true;
	notification: boolean = false;

	userData = {
		name: "",
		hierarchy: "",
		initials: ""
	}

	constructor() { }

	ngOnInit(): void {
		const userStorage = JSON.parse(localStorage.getItem("user")!);

		if(userStorage){
			this.userData.name = userStorage.name;
			this.userData.hierarchy = userStorage.hierarchy;
			this.userData.initials = this.userData.name.slice(0, 2).toLocaleUpperCase()
		}
	}

	logOut(){

	}

}
