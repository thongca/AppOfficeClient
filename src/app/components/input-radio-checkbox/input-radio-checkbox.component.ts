import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-radio-checkbox',
  templateUrl: './input-radio-checkbox.component.html',
  styleUrls: ['./input-radio-checkbox.component.css']
})
export class InputRadioCheckboxComponent implements OnInit {
  IsActive: boolean;
  @Input() nameRadio: string;
  @Input() nameTrue: string;
  @Input() nameFalse: string;
  @Output() changeRadio = new EventEmitter();
  constructor() {
   }

  ngOnInit(): void {
    if (this.nameRadio === undefined) {
      this.nameRadio = 'Kích hoạt';
    }
    if (this.nameFalse === undefined) {
      this.nameFalse = 'Không';
    }
    if (this.nameTrue === undefined) {
      this.nameTrue = 'Có';
    }
    this.IsActive = true;
    this.changeRadio.emit(this.IsActive);
  }
  changeRadioButton(value) {
    this.changeRadio.emit(value);
  }
}
