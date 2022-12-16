import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponsibleService } from '../../responsible.service';
import { ResponsibleInterface } from '../../responsible.interface';
import { BaseService } from 'src/app/base/base.service';
import { AddressService } from 'src/app/core/address/address.service';
import { AssociationInterface } from 'src/app/core/association/association.interface';

@Component({
  selector: 'app-create-update-responsible',
  templateUrl: './create-update-responsible.component.html',
  styleUrls: ['./create-update-responsible.component.scss']
})
export class CreateUpdateResponsibleComponent implements OnInit {

  constructor(
    private responsibleService: ResponsibleService,
    private toastrService: BaseService,
    private addressService: AddressService,
    public activeModal: NgbActiveModal
  ) { }
  @Input() associationList: AssociationInterface[] = [];
  @Input() itemUpdate: ResponsibleInterface| any = {};

  loading = false;
  errors: any = [];
  listErrors: any[] = [];
  operation: string = "create";
  titleModal: string = "Criar";
  titleButton: string = "Criar";
  onSubmit: boolean = false;
  
  ResponsibleForm = new FormGroup({
    id: new FormControl(""),
    associationId: new FormControl(""),
    name: new FormControl(""),
    job: new FormControl(""),
    cpf: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    dateFiliation:  new FormControl(""),
    rg: new FormControl(""),
    bodyExpeditor: new FormControl(""),
    maritalStatus: new FormControl(""),
    naturalness: new FormControl(""),
    nationality: new FormControl(""),
    nArtisanWallet: new FormControl(""),
    dueDateArtisanWallet:  new FormControl(""),

    street: new FormControl(""),
    number: new FormControl(""),
    state: new FormControl(""),
    city: new FormControl(""),
    zipCode: new FormControl(""),
    complement: new FormControl(""),
  })

  ngOnInit(): void {
    if(this.itemUpdate){
      this.setUpdateValues();
    } else {
      this.itemUpdate = {};
    }
  }

  setUpdateValues(){
    this.operation = "Update";
    this.titleModal = "Atualizar";
    this.titleButton = "Atualizar";

    console.log(this.itemUpdate)

    this.ResponsibleForm.get("id")?.setValue(this.itemUpdate.id);
    this.ResponsibleForm.get("associationId")?.setValue(this.itemUpdate.associationId);
    this.ResponsibleForm.get("name")?.setValue(this.itemUpdate.name);
    this.ResponsibleForm.get("job")?.setValue(this.itemUpdate.job);
    this.ResponsibleForm.get("cpf")?.setValue(this.itemUpdate.cpf);
    this.ResponsibleForm.get("street")?.setValue(this.itemUpdate.address.street);
    this.ResponsibleForm.get("number")?.setValue(this.itemUpdate.address.number);
    this.ResponsibleForm.get("state")?.setValue(this.itemUpdate.address.city.state.code);
    this.ResponsibleForm.get("city")?.setValue(this.itemUpdate.address.city.name);
    this.ResponsibleForm.get("zipCode")?.setValue(this.itemUpdate.address.zipCode);
    this.ResponsibleForm.get("complement")?.setValue(this.itemUpdate.address.complement);
    this.ResponsibleForm.get("email")?.setValue(this.itemUpdate.email);
    this.ResponsibleForm.get("phone")?.setValue(this.itemUpdate.phone);
    this.ResponsibleForm.get("dateFiliation")?.setValue(this.itemUpdate.dateFiliation.replace("T00:00:00.000Z", ""));
    this.ResponsibleForm.get("rg")?.setValue(this.itemUpdate.rg);
    this.ResponsibleForm.get("bodyExpeditor")?.setValue(this.itemUpdate.bodyExpeditor);
    this.ResponsibleForm.get("maritalStatus")?.setValue(this.itemUpdate.maritalStatus);
    this.ResponsibleForm.get("naturalness")?.setValue(this.itemUpdate.naturalness);
    this.ResponsibleForm.get("nationality")?.setValue(this.itemUpdate.nationality);
    this.ResponsibleForm.get("nArtisanWallet")?.setValue(this.itemUpdate.nArtisanWallet);
    this.ResponsibleForm.get("dueDateArtisanWallet")?.setValue(this.itemUpdate.dueDateArtisanWallet.replace("T00:00:00.000Z", ""));
  }

  validateForms(){
    const { name } = this.ResponsibleForm.value;

    if(this.ResponsibleForm.valid){
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
    if(this.ResponsibleForm.valid){
      this.loading = true;
      const data: ResponsibleInterface = this.ResponsibleForm.value;
      delete data.id;

      this.responsibleService.createItem(data).subscribe(response => {
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
    if(this.ResponsibleForm.valid){
      this.loading = true;
      const data: ResponsibleInterface = this.ResponsibleForm.value;
            
      this.responsibleService.updateItem(data.id!, data).subscribe(response => {
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
    const { zipCode } = this.ResponsibleForm.value;

    this.addressService.searchAddressByZipCode(zipCode).subscribe(response => {
      const { city, state, street } = response;

      if(city){
        this.ResponsibleForm.get("city")?.setValue(city);
      }

      if(state){
        this.ResponsibleForm.get("state")?.setValue(state);
      }

      if(street){
        this.ResponsibleForm.get("street")?.setValue(street);
      }
    })
  }

  setCloseModal(result: boolean){
    this.listErrors = [];
    this.ResponsibleForm.reset();
    this.activeModal.close({
      success: result
    });
  }

}
