import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PasswordResetPage } from "./password-reset.page";

const routes: Routes = [
  {path: "", component: PasswordResetPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule { }
