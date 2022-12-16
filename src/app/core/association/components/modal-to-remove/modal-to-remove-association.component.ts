import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/base/base.service';
import { AssociationService } from '../../association.service';


@Component({
  selector: 'app-modal-to-remove-association',
  templateUrl: './modal-to-remove-association.component.html',
  styleUrls: ['./modal-to-remove-association.component.scss']
})
export class ModalToRemoveAssociationComponent implements OnInit {

  constructor(
    private associationService: AssociationService,
    private toastrService: BaseService,
    private activeModal: NgbActiveModal
  ) { }

  @Input() openModal = false;
  @Input() itemId: string = "";

  loadingDelete = false;

  ngOnInit(): void {
  }

  removeItems(){
    this.loadingDelete = true;

    this.associationService.deleteItem(this.itemId).subscribe(() => {
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
