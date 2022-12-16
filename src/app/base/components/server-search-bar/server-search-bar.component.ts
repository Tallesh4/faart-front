import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'server-search-bar',
	templateUrl: './server-search-bar.component.html',
	styleUrls: ['./server-search-bar.component.scss']
})
export class ServerSearchBarComponent {
	@Output() changeSearch = new EventEmitter();
	@Input() placeholder = "Pesquisar";
	@Input() value: string = "";
	constructor() { }

	inputSearchChanged(event: Event) {
		const input = (event.target as HTMLInputElement)
		this.changeSearch.emit({search: input.value});
	}
}
