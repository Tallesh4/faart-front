import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseService } from "src/app/base/base.service";
import { TokenGuard } from "src/app/base/guards/token.guard";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-verify",
	templateUrl: "./verify.page.html",
	styleUrls: ["./verify.page.scss"]
})
export class VerifyPage implements OnInit {

	form = new FormGroup({
		token: new FormControl(''),
		code: new FormControl('')
	});
	submitting = false;
	id: string = "";
	redirectTo: string = "/splash";
	constructor(
		private authService: AuthService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private tokenGuard: TokenGuard,
		private toastrService: BaseService,
	) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			this.id = params.id;
			this.redirectTo = params.redirectTo ?? "/splash";
			if(!this.id) {
				this.router.navigate(['login']);
			}
		})
		this.activatedRoute.queryParams.subscribe(params => {
			this.form.get("token")?.setValue(params['token'] ?? '');
		})
	}

	onSubmit() {
		this.submitting = true;
		const data = this.form.value;
		this.authService.verify(this.id, data.token, data.code).subscribe(tokens => {
			this.tokenGuard.storeTokens(tokens);
			this.submitting = false;
			this.router.navigateByUrl(this.redirectTo);
		}, error => {
			this.submitting = false;
			if(error.error.message === 'id invalid'){
				this.router.navigateByUrl("/login")
			}
			
			this.toastrService.error("Código inválido");
		});
	}
}
