import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ClickOutsideWindowsEvent } from "src/utils/ClickOutsideComponentEvent";

@Component({
	selector: 'navbar-menu',
	templateUrl: './navbar-menu.component.html',
	styleUrls: ['./navbar-menu.component.scss']
})

export class NavbarMenuComponent  {

	@Input() isLoggedIn: boolean = false;
	@Input() data = {
		name: "",
		hierarchy: "",
		initials: ""
	}

	notification = false;

	@ViewChild('button') button?: ElementRef;
	@ViewChild('subMenu') subMenu?: ElementRef;
	constructor(
		private renderer: Renderer2,
	) {
		this.renderer.listen('window', 'click', (e: Event) => {
			if(this.button && this.subMenu) {
				if(e.target == this.button.nativeElement || this.button.nativeElement.contains(e.target)) {
					this.toggleSubMenu();
				} else if(e.target !== this.subMenu.nativeElement) {
					this.notification = false;
				}
			}
		})
	}

	toggleSubMenu(){
		this.notification = !this.notification;
	}
}
