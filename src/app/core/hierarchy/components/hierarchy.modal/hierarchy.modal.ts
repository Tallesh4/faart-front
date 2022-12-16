import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseService } from "src/app/base/base.service";
import { PermissionInterface } from "src/app/core/permission/permission.interface";
import { PermissionService } from "src/app/core/permission/permission.service";
import { HierarchyInterface } from "../../hierarchy.interface";
import { HierarchyService } from "../../hierarchy.service";

@Component({
	selector: "hierarchy-modal",
	templateUrl: "./hierarchy.modal.html",
	styleUrls: [

	]
})
export class HierarchyModal {
	hierarchy?: HierarchyInterface;

	form = new FormGroup({
		tag: new FormControl(""),
		name: new FormControl(""),
		level: new FormControl("")
	});
	selectedPermissions: PermissionInterface[] = [];
	errors: any;
	submitting = false;

	@Output() onClose = new EventEmitter();
	@ViewChild('content') content: HTMLElement | undefined;

	loadingPermissions = true;
	permissions?: PermissionInterface[];
	constructor(
		private permissionService: PermissionService,
		private hierarchyService: HierarchyService,
		private modal: NgbModal,
		private toastr: BaseService,
	) {
		this.permissionService.getAllPermissions().subscribe(permissions => {
			this.permissions = permissions;
			this.loadingPermissions = false;
		});
	}

	open(hierarchy?: HierarchyInterface) {
		this.hierarchy = hierarchy;
		this.selectedPermissions = [];
		if(this.hierarchy) {
			this.form.setValue({
				tag: this.hierarchy.tag ?? "",
				name: this.hierarchy.name ?? "",
				level: this.hierarchy.level ?? 0,
			});

			this.permissions?.forEach(permission => {
				if(permission.id && this.hierarchy?.permissionIds?.includes(permission.id)) {
					this.selectedPermissions.push(permission);
				}
			})
		} else {
			this.form.setValue({
				tag: "",
				name: "",
				level: 0,
			});
		}
		this.errors = {};
		this.submitting = false;

		return this.modal.open(this.content).result;
	}

	addPermission(permissionTag: string) {
		const permission = this.permissions?.find(p => p.tag == permissionTag);
		const exists = this.selectedPermissions.find(p => p.tag == permissionTag);
		if(permission && !exists) {
			this.selectedPermissions.push(permission)
		}
	}

	removePermission(index: number) {
		this.selectedPermissions.splice(index, 1);
	}

	create() {
		const data = this.form.value;
		this.submitting = true;
		data.permissionIds = this.selectedPermissions.map(permission => permission.id);

		this.hierarchyService.createHierarchy(data).subscribe(hierarchy => {
			this.submitting = false;
			this.toastr.success("Hierarquia criada com sucesso!");
			this.onClose.emit();
			this.modal.dismissAll();
		}, reason => {
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
		data.permissionIds = this.selectedPermissions.map(permission => permission.id);

		if(this.hierarchy?.tag == data.tag) {
			delete data.tag;
		}

		if(this.hierarchy && this.hierarchy.id) {
			this.hierarchyService.updateHierarchy(this.hierarchy?.id, data).subscribe(hierarchy => {
				this.submitting = false;
				this.toastr.success("Hierarquia atualizada com sucesso!");
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
