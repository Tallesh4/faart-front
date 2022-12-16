import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent implements OnInit {

  @Input() props: any;
  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  setCloseModal(result: boolean){
    
    this.activeModal.close({
      success: result
    })
  }

}
