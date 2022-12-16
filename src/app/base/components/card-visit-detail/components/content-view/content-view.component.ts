import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalImageComponent } from '../modal-image/modal-image.component';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss']
})
export class ContentViewComponent implements OnInit {

  @Input() contentItem: any;
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

  }

  openModalImage(props: any) {
    const modalRef = this.modalService.open(ModalImageComponent, {
      size: "lg",
    })

    modalRef.componentInstance.props = props;
  }

}
