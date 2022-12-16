import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/base/base.service';
import { ProductInterface } from '../../product.interface';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.scss']
})
export class RemoveProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private toastrService: BaseService,
    private activeModal: NgbActiveModal
  ) { }

  @Input() openModal = false;
  @Input() itemID: string = "";

  loadingDelete = false;

  ngOnInit(): void {
  }

  removeItems(){
    this.loadingDelete = true;

    this.productService.deleteItem(this.itemID).subscribe(() => {
      this.loadingDelete = true;
      this.toastrService.success("Removido com sucesso");
      this.setCloseModal(true);
    }, (error) => {
      this.loadingDelete = false;
    })
  }

  setCloseModal(result: boolean){
    this.openModal = false;
    this.loadingDelete = false;
    this.activeModal.close({
      success: result
    })
  }

}
