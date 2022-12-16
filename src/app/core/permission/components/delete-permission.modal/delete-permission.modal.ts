import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseService } from "src/app/base/base.service";
import { PermissionInterface } from "../../permission.interface";
import { PermissionService } from "../../permission.service";

@Component({
	selector: "delete-permission-modal",
	templateUrl: "./delete-permission.modal.html",
	styleUrls: [

	]
})
export class DeletePermissionModal {
	permission: any;
	submitting = false;
	errors: any;
	@ViewChild('content') content?: HTMLElement;
	@Output() onClose = new EventEmitter();

	headers = [
		{key: 'id', value: "ID"},
		{key: 'tag', value: 'Etiqueta'},
		{key: 'collectionName', value: 'Nome da coleção'},
		{key: 'type', value: 'Tipo'},
		{key: 'name', value: 'Nome'},
		{key: 'description', value: 'Descrição'},
		{key: 'createdAt', value: "Criado em"},
		{key: 'updatedAt', value: "Atualizado em"},
	]
	constructor(
		private permissionService: PermissionService,
		private toastr: BaseService,
		private modal: NgbModal
	) {}
	open(permission: PermissionInterface) {
		this.permission = permission;
		return this.modal.open(this.content).result
	}
	confirm() {
		this.submitting = true;

		if(this.permission && this.permission.id) {
			this.permissionService.deletePermission(this.permission.id).subscribe(permission => {
				this.toastr.success("Permissão excluída com sucesso!");
				this.onClose.emit();
				this.modal.dismissAll();
			}, reason => {
				if(reason.error.errors) {
					if(reason.error.errors.id) {
						this.toastr.error(reason.error.errors.id);
					}
					this.errors = reason.error.errors;
				} else {
					this.toastr.error(reason.error.message);
				}
			});
		}
	}
}
