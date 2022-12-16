import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'loading-circle',
	templateUrl: './loading-circle.component.html',
	styleUrls: ['./loading-circle.component.scss']
})
export class LoadingCircleComponent implements OnInit {

	@Input() loading: boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

}
