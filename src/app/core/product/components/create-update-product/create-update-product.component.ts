import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/base/base.service';
import { ProductInterface } from '../../product.interface';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss']
})
export class CreateUpdateProductComponent implements OnInit {

  @Input() updateItem: ProductInterface | any;

  operation: string = "create";
  titleModal: string = "Criar um novo produto";
  titleButton: string = "Adicionar";
  listErrors: string[] = [];

  loading: boolean = false;


  ProductForm = new FormGroup({
    name:new FormControl(""),
    type:new FormControl(""),
    unity:new FormControl(""),
    productSku:new FormControl(""),
    linkUrl:new FormControl(""),
    linkImage:new FormControl(""),
    description:new FormControl(""),
    brandName:new FormControl(""),
    categoryName:new FormControl(""),  
    id: new FormControl(""),
  });

  messageErrorsInput = [
    {
      key: 'name',
      message: "Nome do produto é obrigatório"
    },
    {
      key: 'linkUrl',
      message: "Url é obrigatória"
    },
    {
      key: 'productSku',
      message: "Código do Protheus é obrigatório"
    }
  ]
  
  constructor(
    private activeModal: NgbActiveModal,
    private productService: ProductService,
    private toastrService: BaseService
  ) { }

  ngOnInit(): void {
    if(this.updateItem){
      this.setUpdateValues();
    }
  }

  setUpdateValues(){
    this.operation = "Update";
    this.titleModal = "Atualizar Produtos";
    this.titleButton = "Atualizar";

    this.ProductForm.get("id")?.setValue(this.updateItem!.id);
    this.ProductForm.get("name")?.setValue(this.updateItem!.name);
    this.ProductForm.get("type")?.setValue(this.updateItem!.type);
    this.ProductForm.get("unity")?.setValue(this.updateItem!.unity);
    this.ProductForm.get("productSku")?.setValue(this.updateItem!.productSku);
    this.ProductForm.get("linkUrl")?.setValue(this.updateItem!.linkUrl);
    this.ProductForm.get("linkImage")?.setValue(this.updateItem!.linkImage);
    this.ProductForm.get("description")?.setValue(this.updateItem!.description);
    this.ProductForm.get("brandName")?.setValue(this.updateItem!.brandName);
    this.ProductForm.get("categoryName")?.setValue(this.updateItem!.categoryName);
  }


  validateForms(){
    this.listErrors = [];

    if(this.ProductForm.valid){
      this.listErrors = [];

      if(this.operation === 'create'){
        this.saveProduct();
      } else {
        this.updateProduct();
      }
    }

    if(!this.ProductForm.valid){
      for(let keyItem in this.ProductForm.value){
        const item = this.ProductForm.value[keyItem];
        
        if(!item){
          const getError = this.messageErrorsInput.find((element => element.key === keyItem));
          
          if(getError){
            this.listErrors.push(getError.message);
          }
        }
      }
    }
  }

  saveProduct(){    
    if(this.ProductForm.valid){
      this.loading = true;
      const product: ProductInterface = this.ProductForm.value;
      delete product.id;

      this.productService.createItem(product).subscribe(response => {
        if(response){
          this.loading = false;
          this.toastrService.success("Cadastrado com sucesso");
          this.setCloseModal(true);
        }
      }, (error) => {
        this.loading = false;
        const listErrorsResponse = error.error.errors;
        this.getListErrorsResponseResponse(listErrorsResponse);
      })
    }
  }

  updateProduct(){
    if(this.ProductForm.valid){
      this.loading = true;
      const product: ProductInterface = this.ProductForm.value;
            
      this.productService.updateItem(product.id!, product).subscribe(response => {
        if(response){
          this.loading = false;
          this.toastrService.success("Atualizado com sucesso");
          this.setCloseModal(true);
        }

      }, (error) => {
        this.loading = false;
        const listErrorsResponse = error.error.errors;
        this.getListErrorsResponseResponse(listErrorsResponse);
      }) 
    }
  }

  setCloseModal(result: boolean){
    this.listErrors = [];
    this.ProductForm.reset();
    this.activeModal.close({
      success: result
    });
  }

  getListErrorsResponseResponse(listErrorsResponse: any[]){
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
}
