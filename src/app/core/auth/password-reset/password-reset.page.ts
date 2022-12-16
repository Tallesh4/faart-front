import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BaseService } from "src/app/base/base.service";
import { PasswordResetService } from "./password-reset.service";

@Component({
	selector: "app-passwordReset",
	templateUrl: "./password-reset.page.html",
	styleUrls: ["./password-reset.page.scss"]
})
export class PasswordResetPage implements OnInit {

	constructor(
    private passwordResetService: PasswordResetService,
    private toasthService: BaseService,
    private router: Router
  ) { }

  redirect: string = "/renovar-senha";
  message: string = "Digite o nome de usuário";
  token: string = "";
  id: string = "";
  code: string = "";

  formCode: boolean = false;
  loading: boolean = false;
  formReset = new FormGroup({
    username: new FormControl(""),
    code: new FormControl("")
  })

  ngOnInit(): void {

  }

  onSubmitResetPassword(){
    const { username } = this.formReset.value;

    if(this.formReset.valid){
      this.loading = true;

      this.passwordResetService.passwordReset(username).subscribe(response => {
        this.id = response.id;
        this.token = response.token;
        this.formCode = true;
        this.loading = false;
        this.message = `Código enviado para: ${response.userEmail}`;
      }, (error) => {
        this.loading = false;
        const { username } = error.error.errors;

        if(username && username.length){
          this.toasthService.error(username[0])
        }
      })
    }
  }

  onSubmitCode(){
    const { code } = this.formReset.value;

    if(this.formReset.valid){
      this.loading = true;

      this.passwordResetService.verifyCode(this.id, code, this.token).subscribe(response => {
        if(response){
          this.router.navigate(["/renovar-senha", this.id], {
            queryParams: {
              token: this.token,
              code: code,
              relativeTo: this.redirect
            },
          });
        }
      }, (error => {
        this.loading = false;
      }))
    }
  }

  goLogin(){
    this.router.navigateByUrl("/login");
  }
}
