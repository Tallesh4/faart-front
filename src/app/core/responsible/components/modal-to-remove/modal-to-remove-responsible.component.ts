import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'src/app/base/base.service';
import { ResponsibleService } from '../../responsible.service';


@Component({
  selector: 'app-modal-to-remove-responsible',
  templateUrl: './modal-to-remove-responsible.component.html',
  styleUrls: ['./modal-to-remove-responsible.component.scss']
})
export class ModalToRemoveResponsibleComponent implements OnInit {

  constructor(
    private responsibleService: ResponsibleService,
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

    this.responsibleService.deleteItem(this.itemId).subscribe(() => {
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
