import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BaseModule } from "src/app/base/base.module";
import { AssociationRoutingModule } from "./association-routing.module";
import { AssociationPage } from "./association.page";
import { AssociationService } from "./association.service";
import { ReadAssociationGuard } from "./guards/read.association.guard";
import { CreateAssociationGuard } from "./guards/create.association.guard";
import { UpdateAssociationGuard } from "./guards/update.association.guard";
import { DeleteAssociationGuard } from "./guards/delete.association.guard";
import { CreateUpdateAssociationComponent } from './components/modal-to-create-update/create-update-association.component';
import { ModalToRemoveAssociationComponent } from './components/modal-to-remove/modal-to-remove-association.component';
import { AddressService } from "../address/address.service";

@NgModule({
  declarations: [AssociationPage, CreateUpdateAssociationComponent, ModalToRemoveAssociationComponent],
  imports: [
    AssociationRoutingModule,
    BaseModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AssociationPage],
  providers: [
    AssociationService,
    ReadAssociationGuard,
    CreateAssociationGuard,
    UpdateAssociationGuard,
    DeleteAssociationGuard,
    AddressService
  ]
})
export class AssociationModule { }
