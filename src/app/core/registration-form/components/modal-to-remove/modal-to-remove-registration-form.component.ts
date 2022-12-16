import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RegistrationFormService } from '../../registration-form.service';


@Component({
  selector: 'app-modal-to-remove-registration-form',
  templateUrl: './modal-to-remove-registration-form.component.html',
  styleUrls: ['./modal-to-remove-registration-form.component.scss']
})
export class ModalToRemoveRegistrationFormComponent implements OnInit {

  constructor(
    private registrationFormService: RegistrationFormService,
    private toastrService: ToastrService,
    private activeModal: NgbActiveModal
  ) { }

  @Input() openModal = false;
  @Input() itemId: string = "";

  loadingDelete = false;

  ngOnInit(): void {
  }

  removeItems(){
    this.loadingDelete = true;

    this.registrationFormService.deleteItem(this.itemId).subscribe(() => {
      this.loadingDelete = true;
      this.toastrService.success("Removido com sucesso", "Sucesso");
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
