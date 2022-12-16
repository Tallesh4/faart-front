import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseService } from "src/app/base/base.service";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit{

	form = new FormGroup({
		username: new FormControl(''),
		password: new FormControl('')
	});
	submitting = false;
	redirectTo: string = "/";
	constructor(
		private authService: AuthService,
		private router: Router,
		private toastrService: BaseService,
		private activatedRoute: ActivatedRoute
	) { }
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			if(params.message) {
				this.toastrService.success(params.message);
			}
			this.redirectTo = params.redirectTo;
		})
	}

	onSubmit() {
		this.submitting = true;
		const data = this.form.value;
		this.authService.login(data.username, data.password).subscribe(verify => {
			this.toastrService.success("Código de segurança enviado para o email");
			this.router.navigate(["/verificacao", verify.id], {
				queryParams: {
					token: verify.token,
					redirectTo: this.redirectTo
				}
			})
			this.submitting = false;
		}, reason => {
			console.log(reason);
			this.toastrService.error(reason.error.message);
			this.submitting = false;
		});
	}

	resetPassword(){
		this.router.navigate(['/resete-senha'])
	}
}
