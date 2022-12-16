import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AssociationService } from '../../association.service';
import { AssociationInterface } from '../../association.interface';
import { BaseService } from 'src/app/base/base.service';
import { AddressService } from 'src/app/core/address/address.service';

@Component({
  selector: 'app-create-update-association',
  templateUrl: './create-update-association.component.html',
  styleUrls: ['./create-update-association.component.scss']
})
export class CreateUpdateAssociationComponent implements OnInit {

  constructor(
    private associationService: AssociationService,
    private addressService: AddressService,
    private toastrService: BaseService,
    public activeModal: NgbActiveModal
  ) { }

  @Input() itemUpdate: AssociationInterface = {
    entityName: "",
    fantasyName: "",
    legalForm: "",
    phone: "",
    email: "",
    cnpj: "",
  };

  loading = false;
  errors: any = [];
  listErrors: any[] = [];
  operation: string = "create";
  titleModal: string = "Criar";
  titleButton: string = "Criar";
  onSubmit: boolean = false;

  AssociationForm = new FormGroup({
    id: new FormControl(""),
    entityName:  new FormControl(""),
    fantasyName:  new FormControl(""),
    legalForm:  new FormControl(""),
    phone:  new FormControl(""),
    email:  new FormControl(""),
    cnpj:  new FormControl(""),

    street: new FormControl(""),
    number: new FormControl(""),
    state: new FormControl(""),
    city: new FormControl(""),
    zipCode: new FormControl(""),
    complement: new FormControl(""),
  });

  ngOnInit(): void {
    if(this.itemUpdate){
      this.setUpdateValues();
    }
  }

  setUpdateValues(){
    this.operation = "Update";
    this.titleModal = "Atualizar";
    this.titleButton = "Atualizar";

    this.AssociationForm.get("id")?.setValue(this.itemUpdate.id);
    this.AssociationForm.get("entityName")?.setValue(this.itemUpdate.entityName);
    this.AssociationForm.get("fantasyName")?.setValue(this.itemUpdate.fantasyName);
    this.AssociationForm.get("legalForm")?.setValue(this.itemUpdate.legalForm);
    this.AssociationForm.get("email")?.setValue(this.itemUpdate.email);
    this.AssociationForm.get("phone")?.setValue(this.itemUpdate.phone);
    this.AssociationForm.get("cnpj")?.setValue(this.itemUpdate.cnpj);
    this.AssociationForm.get("street")?.setValue(this.itemUpdate.address.street);
    this.AssociationForm.get("number")?.setValue(this.itemUpdate.address.number);
    this.AssociationForm.get("state")?.setValue(this.itemUpdate.address.city.state.code);
    this.AssociationForm.get("city")?.setValue(this.itemUpdate.address.city.name);
    this.AssociationForm.get("zipCode")?.setValue(this.itemUpdate.address.zipCode);
    this.AssociationForm.get("complement")?.setValue(this.itemUpdate.address.complement);
  }

  validateForms(){
    const { name } = this.AssociationForm.value;

    if(this.AssociationForm.valid){
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
    if(this.AssociationForm.valid){
      this.loading = true;
      const data: AssociationInterface = this.AssociationForm.value;
      delete data.id;

      this.associationService.createItem(data).subscribe(response => {
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
    if(this.AssociationForm.valid){
      this.loading = true;
      const data: AssociationInterface = this.AssociationForm.value;
            
      this.associationService.updateItem(data.id!, data).subscribe(response => {
        if(response){
          this.loading = false;
          this.toastrService.success("Atualizado com sucesso");
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

  searchAddress(){
    const { zipCode } = this.AssociationForm.value;

    this.addressService.searchAddressByZipCode(zipCode).subscribe(response => {
      const { city, state, street } = response;

      if(city){
        this.AssociationForm.get("city")?.setValue(city);
      }

      if(state){
        this.AssociationForm.get("state")?.setValue(state);
      }

      if(street){
        this.AssociationForm.get("street")?.setValue(street);
      }
    })
  }


  setCloseModal(result: boolean){
    this.listErrors = [];
    this.AssociationForm.reset();
    this.activeModal.close({
      success: result
    });
  }

}
