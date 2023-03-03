import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  constructor( public modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
