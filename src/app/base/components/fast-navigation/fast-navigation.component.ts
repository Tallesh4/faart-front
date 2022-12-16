import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'fast-navigation',
	templateUrl: './fast-navigation.component.html',
	styleUrls: ['./fast-navigation.component.scss']
})
export class FastNavigationComponent implements OnInit {
	@Input() fastNavigationData: any[] = [];

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	goTo(item: any): void{
		const validLastItem = this.fastNavigationData[this.fastNavigationData.length - 1].path !== item.path;
		if(validLastItem)
			this.router.navigate([item.path]);
	}

}
