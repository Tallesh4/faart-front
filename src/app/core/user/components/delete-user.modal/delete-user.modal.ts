import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseService } from "src/app/base/base.service";
import { UserInterface } from "../../user.interface";
import { UserService } from "../../user.service";

@Component({
	selector: "delete-user-modal",
	templateUrl: "./delete-user.modal.html",
	styleUrls: [

	]
})
export class DeleteUserModal {
	user: any;
	submitting = false;
	errors: any;
	@ViewChild('content') content?: HTMLElement;
	@Output() onClose = new EventEmitter();

	headers = [
		{key: 'tag', value: 'Etiqueta'},
		{key: 'name', value: 'Nome'},
		{key: 'level', value: 'Nível'},
		{key: 'createdAt', value: "Criado em"},
		{key: 'updatedAt', value: "Atualizado em"},
	]
	constructor(
		private userService: UserService,
		private toastr: BaseService,
		private modal: NgbModal
	) {}
	open(user: UserInterface) {
		this.user = user;
		return this.modal.open(this.content).result
	}
	confirm() {
		this.submitting = true;

		if(this.user && this.user.id) {
			this.userService.deleteUser(this.user.id).subscribe(user => {
				this.toastr.success("Usuário excluído com sucesso!");
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
