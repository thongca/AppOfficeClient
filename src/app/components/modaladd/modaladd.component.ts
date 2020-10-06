import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modaladd',
  templateUrl: './modaladd.component.html',
  styleUrls: ['./modaladd.component.css']
})
export class ModaladdComponent implements OnInit {
  @Input() list;
  @Input() sizeModal;
  @Input() titleModal;
  @Output() freshData = new EventEmitter();
  @Output() addData = new EventEmitter();
  @ViewChild('addModal', { static: false }) public addModal: ModalDirective;
  titleDetail: string;
  constructor() { }

  ngOnInit(): void {
    this.titleDetail = this.titleModal === undefined ? 'Thêm mới' : this.titleModal;
  }
  showModal() {
    this.addModal.show();
    this.freshData.emit(0);
  }
  XacNhan() {
  }
  r2_AddData() {
  }
}
