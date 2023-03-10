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
		  message: "Nome da entidade ?? obrigat??rio"
		},
		{
		  key: 'fantasyName',
		  message: "Nome fantasia ?? obrigat??rio"
		},
		{
		  key: 'legalForm',
		  message: "Forma Jur??dica ?? obrigat??rio"
		},
		{
		  key: 'CNPJ',
		  message: "CNPJ ?? obrigat??rio"
		},
		{
		  key: 'streetAssociation',
		  message: "Endere??o ?? obrigat??rio"
		},
		{
		  key: 'zipCodeAssociation',
		  message: "CEP ?? obrigat??rio"
		},
		{
		  key: 'cityAssociation',
		  message: "Cidade da Entidade ?? obrigat??rio"
		},
		{
		  key: 'numberAssociation',
		  message: "Numero ?? obrigat??rio"
		},
		{
		  key: 'emailAssociation',
		  message: "E-mail da entidade ?? obrigat??rio"
		}, 
		{
		  key: 'name',
		  message: "Nome do Respons??vel ?? obrigat??rio"
		}, 
		{
		  key: 'job',
		  message: "Cargo na Entidade ?? obrigat??rio"
		},
		{
		  key: 'cpf',
		  message: "CPF ?? obrigat??rio"
		},
		{
		  key: 'rg',
		  message: "RG ?? obrigat??rio"
		},
		{
		  key: 'bodyExpeditor',
		  message: "??rg??o Expedidor ?? obrigat??rio"
		},
		{
		  key: 'dateFiliation',
		  message: "Data de Filia????o ?? obrigat??rio"
		},
		{
		  key: 'nArtisanWallet',
		  message: "N?? Carteira de Artes??o SICAB ?? obrigat??rio"
		},
		{
		  key: 'email',
		  message: "E-mail do Respons??vel ?? obrigat??rio"
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
