import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistrationFormPage } from "./registration-form.page";

const routes: Routes = [
  {path: "", component: RegistrationFormPage},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationFormRoutingModule { }
