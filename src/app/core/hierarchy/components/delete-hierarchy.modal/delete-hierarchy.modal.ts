import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseService } from "src/app/base/base.service";
import { HierarchyInterface } from "../../hierarchy.interface";
import { HierarchyService } from "../../hierarchy.service";

@Component({
	selector: "delete-hierarchy-modal",
	templateUrl: "./delete-hierarchy.modal.html",
	styleUrls: [

	]
})
export class DeleteHierarchyModal {
	hierarchy: any;
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
		private hierarchyService: HierarchyService,
		private toastr: BaseService,
		private modal: NgbModal
	) {}
	open(hierarchy: HierarchyInterface) {
		this.hierarchy = hierarchy;
		return this.modal.open(this.content).result
	}
	confirm() {
		this.submitting = true;

		if(this.hierarchy && this.hierarchy.id) {
			this.hierarchyService.deleteHierarchy(this.hierarchy.id).subscribe(hierarchy => {
				this.toastr.success("Hierarquia excluída com sucesso!");
				this.onClose.emit();
				this.modal.dismissAll();
			}, reason => {
				console.log(reason);
				if(reason.error.errors) {
					this.errors = reason.error.errors;
				} else {
					this.toastr.error(reason.error.message);
				}
			});
		}
	}
}
