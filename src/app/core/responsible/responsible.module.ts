import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BaseModule } from "src/app/base/base.module";
import { ResponsibleRoutingModule } from "./responsible-routing.module";
import { ResponsiblePage } from "./responsible.page";
import { ResponsibleService } from "./responsible.service";
import { ReadResponsibleGuard } from "./guards/read.responsible.guard";
import { CreateResponsibleGuard } from "./guards/create.responsible.guard";
import { UpdateResponsibleGuard } from "./guards/update.responsible.guard";
import { DeleteResponsibleGuard } from "./guards/delete.responsible.guard";
import { CreateUpdateResponsibleComponent } from './components/modal-to-create-update/create-update-responsible.component';
import { ModalToRemoveResponsibleComponent } from './components/modal-to-remove/modal-to-remove-responsible.component';
import { AssociationService } from "../association/association.service";

@NgModule({
  declarations: [ResponsiblePage, CreateUpdateResponsibleComponent, ModalToRemoveResponsibleComponent],
  imports: [
    ResponsibleRoutingModule,
    BaseModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ResponsiblePage],
  providers: [
    ResponsibleService,
    AssociationService,
    ReadResponsibleGuard,
    CreateResponsibleGuard,
    UpdateResponsibleGuard,
    DeleteResponsibleGuard
  ]
})
export class ResponsibleModule { }
