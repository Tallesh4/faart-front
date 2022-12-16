import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseService } from 'src/app/base/base.service';
import { AddressService } from 'src/app/core/address/address.service';
import { RegistrationFormInterface } from 'src/app/core/registration-form/registration-form.interface';
import { RegisterSiteService } from './register.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	constructor(
		private registrationFormService: RegisterSiteService,
		private toastrService: BaseService,
		private addressService: AddressService,
	) { }


	loading = false;
	listErrors: any[] = [];

	RegistrationFormForm = new FormGroup({
		entityName: new FormControl(""),
		fantasyName: new FormControl(""),
		legalForm: new FormControl(""),
		streetAssociation: new FormControl(""),
		numberAssociation: new FormControl(""),
		stateAssociation: new FormControl(""),
		cityAssociation: new FormControl(""),
		zipCodeAssociation: new FormControl(""),
		complementAssociation: new FormControl(""),
		phoneAssociation: new FormControl(""),
		emailAssociation: new FormControl(""),
		cnpjAssociation: new FormControl(""),
		name: new FormControl(""),
		job: new FormControl(""),
		streetResponsible: new FormControl(""),
		numberResponsible: new FormControl(""),
		stateResponsible: new FormControl(""),
		cityResponsible: new FormControl(""),
		zipCodeResponsible: new FormControl(""),
		complementResponsible: new FormControl(""),
		cpf: new FormControl(""),
		email: new FormControl(""),
		phone: new FormControl(""),
		dateFiliation: new FormControl(""),
		rg: new FormControl(""),
		bodyExpeditor: new FormControl(""),
		maritalStatus: new FormControl(""),
		naturalness: new FormControl(""),
		nationality: new FormControl(""),
		nArtisanWallet: new FormControl(""),
		dueDateArtisanWallet: new FormControl(""),
	});

	messageErrorsInput = [
		{
		  key: 'entityName',
		  message: "Nome da entidade é obrigatório"
		},
		{
		  key: 'fantasyName',
		  message: "Nome fantasia é obrigatório"
		},
		{
		  key: 'legalForm',
		  message: "Forma Jurídica é obrigatório"
		},
		{
		  key: 'CNPJ',
		  message: "CNPJ é obrigatório"
		},
		{
		  key: 'streetAssociation',
		  message: "Endereço é obrigatório"
		},
		{
		  key: 'zipCodeAssociation',
		  message: "CEP é obrigatório"
		},
		{
		  key: 'cityAssociation',
		  message: "Cidade da Entidade é obrigatório"
		},
		{
		  key: 'numberAssociation',
		  message: "Numero é obrigatório"
		},
		{
		  key: 'emailAssociation',
		  message: "E-mail da entidade é obrigatório"
		}, 
		{
		  key: 'name',
		  message: "Nome do Responsável é obrigatório"
		}, 
		{
		  key: 'job',
		  message: "Cargo na Entidade é obrigatório"
		},
		{
		  key: 'cpf',
		  message: "CPF é obrigatório"
		},
		{
		  key: 'rg',
		  message: "RG é obrigatório"
		},
		{
		  key: 'bodyExpeditor',
		  message: "Órgão Expedidor é obrigatório"
		},
		{
		  key: 'dateFiliation',
		  message: "Data de Filiação é obrigatório"
		},
		{
		  key: 'nArtisanWallet',
		  message: "Nº Carteira de Artesão SICAB é obrigatório"
		},
		{
		  key: 'email',
		  message: "E-mail do Responsável é obrigatório"
		}
	  ]

	ngOnInit(): void {
	}

	validateForms() {
		this.listErrors = [];

		console.log(this.RegistrationFormForm.value)

		if (this.RegistrationFormForm.valid) {
			this.listErrors = [];
			this.saveItem()
		}

		if (!this.RegistrationFormForm.valid) {
			for (let keyItem in this.RegistrationFormForm.value) {
				const item = this.RegistrationFormForm.value[keyItem];

				if (!item) {
					const getError = this.messageErrorsInput.find((element => element.key === keyItem));

					if (getError) {
						this.listErrors.push(getError.message);
					}
				}
			}
		}
	}



	saveItem() {
		console.log("Saving", this.RegistrationFormForm);
		if (this.RegistrationFormForm.valid) {
			this.loading = true;
			const data: RegistrationFormInterface = this.RegistrationFormForm.value;
			delete data.id;

			this.registrationFormService.createItem(data).subscribe(response => {
				if (response) {
					this.loading = false;
					this.toastrService.success("Cadastrado com sucesso");
				}
			}, (error) => {
				this.loading = false;
				const listErrorsResponse = error.error.errors;
				this.getListErrors(listErrorsResponse);
			})
		}
	}

	searchAddressAssociation(){
		const { zipCodeAssociation } = this.RegistrationFormForm.value;
	
		this.addressService.searchAddressByZipCode(this.getZipCode(zipCodeAssociation)).subscribe(response => {
		  const { city, state, street } = response;
	
		  if(city){
			this.RegistrationFormForm.get("cityAssociation")?.setValue(city);
		  }
	
		  if(state){
			this.RegistrationFormForm.get("stateAssociation")?.setValue(state);
		  }
	
		  if(street){
			this.RegistrationFormForm.get("streetAssociation")?.setValue(street);
		  }
		})
	  }

	searchAddressResponsible(){
		const { zipCodeResponsible } = this.RegistrationFormForm.value;
	
		this.addressService.searchAddressByZipCode(this.getZipCode(zipCodeResponsible)).subscribe(response => {
		  const { city, state, street } = response;
	
		  if(city){
			this.RegistrationFormForm.get("cityResponsible")?.setValue(city);
		  }
	
		  if(state){
			this.RegistrationFormForm.get("stateResponsible")?.setValue(state);
		  }
	
		  if(street){
			this.RegistrationFormForm.get("streetResponsible")?.setValue(street);
		  }
		})
	  }

	  
	getListErrors(listErrorsResponse: any[]) {
		this.listErrors = [];

		for (let indexError in listErrorsResponse) {
			const listErrorData = listErrorsResponse[indexError];

			if (listErrorData.length) {
				for (let indexErrorData in listErrorData) {
					const errorData = listErrorData[indexErrorData];

					this.listErrors.push(errorData);
				}
			}
		}
	}

	getZipCode(i:any){
		return `${i[0]}${i[1]}${i[2]}${i[3]}${i[4]}-${i[5]}${i[6]}${i[7]}`
	}
}
