import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseService } from "src/app/base/base.service";
import { TokenGuard } from "src/app/base/guards/token.guard";
import { AuthService } from "../auth.service";
import { RenewPasswordService } from "./renew-password.service";

@Component({
	selector: "app-renewPassword",
	templateUrl: "./renew-password.page.html",
	styleUrls: ["./renew-password.page.scss"]
})
export class RenewPasswordPage implements OnInit {

	constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toasthService: BaseService,
    private renewPasswordService: RenewPasswordService
  ) { }

  redirectTo: string = "/splash";
  messageError: string = "Digite uma senha com 8 caracteres";
  submit: boolean = false;
  loading: boolean = false;
  token: string = "";
  code: string = "";
  id: string = "";

  passwordForm = new FormGroup({
    password: new FormControl(""),
    passwordConfirm: new FormControl("")
  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.token = params.token;
      this.code = params.code;
      this.id = params.id;

      if(!this.token && !this.id){
        this.router.navigate(['login'])
      }
    });
  }

  validatePassword(){
    this.submit = true;
    this.messageError = "";
    const { password, passwordConfirm } = this.passwordForm.value;

    if(this.passwordForm.valid){
      if(password !== passwordConfirm){
        this.toasthService.error("Senhas estão diferentes");
        return;
      }

      if(password.length < 8){
        this.messageError = "Digite uma senha com 8 caracteres";
        return;
      }
  
      this.loading = true;

      this.renewPasswordService.resetPassword(this.id, this.code, this.token, password).subscribe(response => {
        if(response){
          this.toasthService.success("Senha alterada com sucesso");
          this.goLogin();
          this.loading = false;
        }
      }, (error => {
        console.log(error);
        this.loading = false;
      }))
    }
  }

  goLogin(){
    this.router.navigateByUrl("/login")
  }
}
