import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeService } from 'src/app/core/me/me.service';

interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
	accordion: any;
	level:number;
}

export const ROUTES: RouteInfo[] = [
	{ path: '/home', title: 'Home', icon: 'assessment', class: '', accordion: [],level:-1 },
	{ path: '/register-form', title: 'Ficha Cadastrais', icon: 'attach_file', class: '', accordion: [],level:3 },
	{ path: '/responsible', title: 'Responsáveis', icon: 'description', class: '', accordion: [],level:3 },
	{ path: '/associations', title: 'Associação', icon: 'track_changes', class: '', accordion: [],level:3 },
	{
		path: 'vendas', title: 'Site', icon: 'devices', class: '', accordion: [
			{ path: 'settings/products', title: 'Produtos', icon: 'shopping_cart', class: '' },
			{ path: 'settings/products', title: 'Slides', icon: 'display_settings', class: '' },
		],level:5
	},
];

@Component({
	selector: 'main-menu',
	templateUrl: './main-menu.component.html',
	styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

	menuItems!: any[];
	acordion = 'listview'
	open: boolean = true
	myAccessLevel = Number

	constructor(
		private meService: MeService,
		private router: Router
		) { }


	ngOnInit(): void {
		this.meService.getMe().subscribe(response => {
		  this.hierarchy(response);
		})
	  }
	
	async hierarchy(response:any){
		console.log(response)
		await this.menuItem(response.hierarchy.level)
		this.myAccessLevel = response.hierarchy.level

		this.menuItems = ROUTES.filter(menuItem => menuItem);
	}

	menuItem(value:any){
		console.log(value)
		value === 0 ?
			this.router.navigate(['/home'])
		:value === 1 ?
			this.router.navigate(['/home'])
		:value === 2 ?
			this.router.navigate(['/produtividade'])
		:value === 3 ?
			this.router.navigate(['/produtividade'])
		:value === 4 ?
			this.router.navigate(['/pedidos'])
		:value === 5 &&
			this.router.navigate(['/vendas-internas/gestao'])
	}

	abrirMenu(value: any) {
		if (value.length > 0) {
			if (this.acordion === "block") {
				this.acordion = "none";
			} else {
				this.acordion = "block";
			}
		}
	}

	close(){
		this.open = !this.open
	}
}
