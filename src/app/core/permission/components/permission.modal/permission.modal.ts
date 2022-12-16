import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseService } from "src/app/base/base.service";
import { PermissionInterface } from "../../permission.interface";
import { PermissionService } from "../../permission.service";

@Component({
	selector: "permission-modal",
	templateUrl: "./permission.modal.html",
	styleUrls: [

	]
})
export class PermissionModal {
	permission?: PermissionInterface;

	form = new FormGroup({
		tag: new FormControl(""),
		collectionName: new FormControl(""),
		type: new FormControl(""),
		name: new FormControl(""),
		description: new FormControl(""),
	});
	errors: any;
	submitting = false;

	@Output() onClose = new EventEmitter();
	@ViewChild('content') content: HTMLElement | undefined;
	constructor(
		private permissionService: PermissionService,
		private modal: NgbModal,
		private toastr: BaseService,
	) {}

	open(permission?: PermissionInterface) {
		this.permission = permission;
		console.log(this.permission);
		if(this.permission) {
			this.form.setValue({
				tag: this.permission.tag ?? "",
				collectionName: this.permission.collectionName ?? "",
				type: this.permission.type ?? "",
				name: this.permission.name ?? "",
				description: this.permission.description ?? ""
			});
		} else {
			this.form.setValue({
				tag: "",
				collectionName: "",
				type: "",
				name: "",
				description: ""
			});
		}
		this.errors = {};
		this.submitting = false;

		return this.modal.open(this.content).result;
	}

	create() {
		const data = this.form.value;
		this.submitting = true;

		this.permissionService.createPermission(data).subscribe(permission => {
			this.submitting = false;
			this.toastr.success("Permissão criada com sucesso!");
			this.onClose.emit();
			this.modal.dismissAll();
		}, reason => {
			console.log(reason);
			if(reason.error.errors) {
				this.errors = reason.error.errors;
			} else {
				console.log(reason.error.message);
			}
		})
	}
	update() {
		const data = this.form.value;
		this.submitting = true;

		if(this.permission?.tag == data.tag) {
			delete data.tag;
		}

		if(this.permission && this.permission.id) {
			this.permissionService.updatePermission(this.permission?.id, data).subscribe(permission => {
				this.submitting = false;
				this.toastr.success("Permissão atualizada com sucesso!");
				this.onClose.emit();
				this.modal.dismissAll();
			}, reason => {
				console.log(reason);
				if(reason.error.errors) {
					this.errors = reason.error.errors;
				}
			})
		}
	}
}
