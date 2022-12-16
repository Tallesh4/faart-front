import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BaseModule } from "src/app/base/base.module";
import { RegistrationFormRoutingModule } from "./registration-form-routing.module";
import { RegistrationFormPage } from "./registration-form.page";
import { RegistrationFormService } from "./registration-form.service";
import { ReadRegistrationFormGuard } from "./guards/read.registration-form.guard";
import { CreateRegistrationFormGuard } from "./guards/create.registration-form.guard";
import { UpdateRegistrationFormGuard } from "./guards/update.registration-form.guard";
import { DeleteRegistrationFormGuard } from "./guards/delete.registration-form.guard";
import { CreateUpdateRegistrationFormComponent } from './components/modal-to-create-update/create-update-registration-form.component';
import { ModalToRemoveRegistrationFormComponent } from './components/modal-to-remove/modal-to-remove-registration-form.component';

@NgModule({
  declarations: [RegistrationFormPage, CreateUpdateRegistrationFormComponent, ModalToRemoveRegistrationFormComponent],
  imports: [
    RegistrationFormRoutingModule,
    BaseModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RegistrationFormPage],
  providers: [
    RegistrationFormService,
    ReadRegistrationFormGuard,
    CreateRegistrationFormGuard,
    UpdateRegistrationFormGuard,
    DeleteRegistrationFormGuard
  ]
})
export class RegistrationFormModule { }
