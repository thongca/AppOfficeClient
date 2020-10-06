import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modaldel',
  templateUrl: './modaldel.component.html',
  styleUrls: ['./modaldel.component.css']
})
export class ModaldelComponent implements OnInit {
  @Input() list;
  @Input() titleModal;
  @Output() xacNhan = new EventEmitter();
  @ViewChild('delModal', { static: false }) public delModal: ModalDirective;
  titleDetail: string;
  constructor() { }

  ngOnInit(): void {
    this.titleDetail = this.titleModal === undefined ? 'Xác nhận xóa' : this.titleModal;
  }
  showModal() {
    this.delModal.show();
  }
  XacNhan() {
    const listDel = this.list.filter(x => x.check === true);
    this.xacNhan.emit(listDel);
    this.delModal.hide();
  }
}
