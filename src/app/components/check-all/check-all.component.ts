import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-all',
  templateUrl: './check-all.component.html',
  styleUrls: ['./check-all.component.css']
})
export class CheckAllComponent implements OnInit {
  CheckLength = 0;
  checkall: boolean;
  @Input() list;
  @Output() checkAll = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.checkall = false;
  }
  // checked
  toggleAll(checked) {
      this.CheckLength = 0;
      this.list.forEach(function (item) {
        item.check = !checked;
      });
      if (this.list) {
        this.CheckLength = this.list.filter(x => x.check === true).length;
      }
    this.checkAll.emit({listData: this.list, CheckLength: this.CheckLength});
  }
  CheckedList(checked) {
    if (checked === true) {
      this.CheckLength = 1;
    } else {
      this.CheckLength = 0;
    }
  }
}
