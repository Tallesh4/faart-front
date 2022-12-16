import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'card-tools',
	templateUrl: './card-tools.component.html',
	styleUrls: ['./card-tools.component.scss']
})
export class CardToolsComponent implements OnInit {

	@Input() imgNameMaterial = "";
	@Input() description = "";
	@Input() buttonTitle = "";
	@Input() pathUrl: any = [];
	@Input() color = "";

	constructor() { }

	ngOnInit(): void {
		this.pathUrl = [this.pathUrl];
	}
}
