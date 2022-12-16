import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RegistrationFormService } from '../../registration-form.service';
import { RegistrationFormInterface } from '../../registration-form.interface';
import { BaseService } from 'src/app/base/base.service';

@Component({
  selector: 'app-create-update-registration-form',
  templateUrl: './create-update-registration-form.component.html',
  styleUrls: ['./create-update-registration-form.component.scss']
})
export class CreateUpdateRegistrationFormComponent implements OnInit {

  constructor(
    private registrationFormService: RegistrationFormService,
    private toastrService: BaseService,
    public activeModal: NgbActiveModal
  ) { }

  @Input() itemUpdate: RegistrationFormInterface = {
    name:  ""
  };

  loading = false;
  listErrors: any[] = [];
  operation: string = "create";
  titleModal: string = "Criar";
  titleButton: string = "Criar";

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

  ngOnInit(): void {
    if(this.itemUpdate){
      this.setUpdateValues();
    }
  }

  setUpdateValues(){
    this.operation = "Update";
    this.titleModal = "Visualizar";
    this.titleButton = "Visualizar";

    this.RegistrationFormForm.get("id")?.setValue(this.itemUpdate.id);
    this.RegistrationFormForm.get("entityName")?.setValue(this.itemUpdate.entityName);
		this.RegistrationFormForm.get("fantasyName")?.setValue(this.itemUpdate.fantasyName);
		this.RegistrationFormForm.get("legalForm")?.setValue(this.itemUpdate.legalForm);
		this.RegistrationFormForm.get("streetAssociation")?.setValue(this.itemUpdate.addressAssociation.street);
		this.RegistrationFormForm.get("numberAssociation")?.setValue(this.itemUpdate.addressAssociation.number);
		this.RegistrationFormForm.get("stateAssociation")?.setValue(this.itemUpdate.addressAssociation.city.state.code);
		this.RegistrationFormForm.get("cityAssociation")?.setValue(this.itemUpdate.addressAssociation.city.name);
		this.RegistrationFormForm.get("zipCodeAssociation")?.setValue(this.itemUpdate.addressAssociation.zipCode);
		this.RegistrationFormForm.get("complementAssociation")?.setValue(this.itemUpdate.addressAssociation.complement);
		this.RegistrationFormForm.get("phoneAssociation")?.setValue(this.itemUpdate.phoneAssociation);
		this.RegistrationFormForm.get("emailAssociation")?.setValue(this.itemUpdate.emailAssociation);
		this.RegistrationFormForm.get("cnpjAssociation")?.setValue(this.itemUpdate.cnpjAssociation);
		this.RegistrationFormForm.get("name")?.setValue(this.itemUpdate.name);
		this.RegistrationFormForm.get("job")?.setValue(this.itemUpdate.job);
    this.RegistrationFormForm.get("streetResponsible")?.setValue(this.itemUpdate.addressResponsible.street);
    this.RegistrationFormForm.get("streetResponsible")?.setValue(this.itemUpdate.addressResponsible.number);
    this.RegistrationFormForm.get("stateResponsible")?.setValue(this.itemUpdate.addressResponsible.city.state.code);
    this.RegistrationFormForm.get("cityResponsible")?.setValue(this.itemUpdate.addressResponsible.city.name);
    this.RegistrationFormForm.get("zipCodeResponsible")?.setValue(this.itemUpdate.addressResponsible.zipCode);
    this.RegistrationFormForm.get("complementResponsible")?.setValue(this.itemUpdate.addressResponsible.complement);
		this.RegistrationFormForm.get("cpf")?.setValue(this.itemUpdate.cpf);
		this.RegistrationFormForm.get("email")?.setValue(this.itemUpdate.email);
		this.RegistrationFormForm.get("phone")?.setValue(this.itemUpdate.phone);
		this.RegistrationFormForm.get("dateFiliation")?.setValue(this.itemUpdate.dateFiliation.replace("T00:00:00.000Z", ""));
		this.RegistrationFormForm.get("rg")?.setValue(this.itemUpdate.rg);
		this.RegistrationFormForm.get("bodyExpeditor")?.setValue(this.itemUpdate.bodyExpeditor);
		this.RegistrationFormForm.get("maritalStatus")?.setValue(this.itemUpdate.maritalStatus);
		this.RegistrationFormForm.get("naturalness")?.setValue(this.itemUpdate.naturalness);
		this.RegistrationFormForm.get("nationality")?.setValue(this.itemUpdate.nationality);
		this.RegistrationFormForm.get("nArtisanWallet")?.setValue(this.itemUpdate.nArtisanWallet);
    this.RegistrationFormForm.get("dueDateArtisanWallet")?.setValue(this.itemUpdate.dueDateArtisanWallet.replace("T00:00:00.000Z", ""));

  }

  validateForms(){
    const { name } = this.RegistrationFormForm.value;

    if(this.RegistrationFormForm.valid){
      this.listErrors = [];

      if(this.operation === "create"){
        this.saveItem();
        return;
      }

      this.updateItem();
      return;
    }
  }

  saveItem(){    
    if(this.RegistrationFormForm.valid){
      this.loading = true;
      const data: RegistrationFormInterface = this.RegistrationFormForm.value;
      delete data.id;

      this.registrationFormService.createItem(data).subscribe(response => {
        if(response){
          this.loading = false;
          this.toastrService.success("Cadastrado com sucesso");
          this.setCloseModal(true);
        }
      }, (error) => {
        this.loading = false;
        const listErrorsResponse = error.error.errors;
        this.getListErrors(listErrorsResponse);
      })
    }
  }

  updateItem(){
    if(this.RegistrationFormForm.valid){
      this.loading = true;
      const data: RegistrationFormInterface = this.RegistrationFormForm.value;
            
      this.registrationFormService.updateItem(data.id!, data).subscribe(response => {
        if(response){
          this.loading = false;
          this.toastrService.success("Atualizado com sucesso")
          this.setCloseModal(true);
        }

      }, (error) => {
        this.loading = false;
        const listErrorsResponse = error.error.errors;
        this.toastrService.error("Ocorreu um erro");
        this.getListErrors(listErrorsResponse);
      }) 
    }
  }

  getListErrors(listErrorsResponse: any[]){
    this.listErrors = [];

    for(let indexError in listErrorsResponse){
      const listErrorData = listErrorsResponse[indexError];

      if(listErrorData.length){
        for(let indexErrorData in listErrorData){
          const errorData = listErrorData[indexErrorData];

          this.listErrors.push(errorData);
        }
      }
    }
  }

  setCloseModal(result: boolean){
    this.listErrors = [];
    this.RegistrationFormForm.reset();
    this.activeModal.close({
      success: result
    });
  }

}
