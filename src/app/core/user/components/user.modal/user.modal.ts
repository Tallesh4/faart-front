import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseService } from "src/app/base/base.service";
import { HierarchyInterface } from "src/app/core/hierarchy/hierarchy.interface";
import { HierarchyService } from "src/app/core/hierarchy/hierarchy.service";
import { UserInterface } from "../../user.interface";
import { UserService } from "../../user.service";

@Component({
	selector: "user-modal",
	templateUrl: "./user.modal.html",
	styleUrls: ["./user.modal.scss"]
})
export class UserModal {
	user?: UserInterface;

	form = new FormGroup({
		name: new FormControl(""),
		username: new FormControl(""),
		email: new FormControl(""),
		hierarchyId: new FormControl(""),
		phone: new FormControl(""),
		hiredAt: new FormControl(""),
		state: new FormControl(""),
		city: new FormControl(""),
		street: new FormControl(""),
		number: new FormControl(""),
		complement: new FormControl(""),
		zipCode: new FormControl(""),
		higherId: new FormControl(""),
		protheusCode: new FormControl("")
	});
	selectedHierarchy: HierarchyInterface[] = [];
	errors: any;
	submitting = false;

	@Output() onClose = new EventEmitter();
	@ViewChild('content') content: HTMLElement | undefined;

	loadingHierarchies = true;
	loadingBranches = true;
	loadingAddress = false;
	hierarchies?: HierarchyInterface[];
	constructor(
		private hierarchyService: HierarchyService,
		private userService: UserService,
		private modal: NgbModal,
		private toastr: BaseService,
	) {
		this.hierarchyService.getAllHierarchies().subscribe(hierarchies => {
			this.hierarchies = hierarchies;
			this.loadingHierarchies = false;
		});
	}

	open(user?: UserInterface) {
		this.form.controls['state'].disable();
		this.form.controls['city'].disable();
		this.form.controls['street'].disable();
		this.form.controls['higherId'].disable();

		this.user = user;

		if(this.user) {
			this.form.setValue({
				name: this.user.name ?? '',
				username: this.user.username ?? '',
				email: this.user.email ?? '',
				hierarchyId: this.user.hierarchyId ?? '',
				phone: this.user.phone ?? '',
				hiredAt: this.user.hiredAt ? new Date(this.user.hiredAt).toISOString().split("T")[0] : '',
				number: this.user.address?.number ? this.user.address.number : '',
				street: this.user.address?.street ? this.user.address.street : '',
				complement: this.user.address?.complement ? this.user.address.complement : '',
				zipCode: this.user.address?.zipCode ? this.user.address.zipCode : '',
				city: this.user.address && this.user.address.city && this.user.address.city.name ? this.user.address.city.name : '',
				state: this.user.address && this.user.address.city && this.user.address.city.state ? this.user.address.city.state.code : '',
				higherId: [],
				protheusCode: this.user.protheusCode ? this.user.protheusCode : '',
			});


			if(this.user.address) {
				this.form.controls['state'].enable();
				this.form.controls['city'].enable();
				this.form.controls['street'].enable();
			}
		} else {
			this.form.setValue({
				name: '',
				username: '',
				email: '',
				hierarchyId: '',
				phone: '',
				hiredAt: new Date().toISOString().split("T")[0],
				number: '',
				street: '',
				complement: '',
				city: '',
				state: '',
				zipCode: '',
				higherId: '',
				protheusCode: ''
			});
		}
		this.errors = {};
		this.submitting = false;

		return this.modal.open(this.content, {size: "xl"}).result;
	}


	create() {
		const data = this.form.value;
		this.submitting = true;

		this.userService.createUser(data).subscribe(user => {
			this.submitting = false;
			this.toastr.success("Usuário criado com sucesso!");
			this.onClose.emit();
			this.modal.dismissAll();
		}, reason => {
			console.log(reason);
			if(reason.error.errors) {
				this.errors = reason.error.errors;
			} else {
				console.log(reason.error.message);
			}
		});
	}
	
	update() {
		const data = this.form.value;
		this.submitting = true;

		if(this.user?.username == data.username) {
			delete data.username;
		}

		if(this.user && this.user.id) {
			this.userService.updateUser(this.user?.id, data).subscribe(user => {
				this.submitting = false;
				this.toastr.success("Usuário atualizado com sucesso!");
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
