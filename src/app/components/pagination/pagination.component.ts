import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { OptionHeader } from '../../common/option';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  @Input() options: OptionHeader;
  @Input() total: number;
  @Input() curentPage: number;
  @Output() rePage = new EventEmitter();
  constructor() {
    this.curentPage = 1;
  }
  listPage: {
    pageNumber: number
  }[] = [];
  ngOnInit() {
    this.options.total = this.total;
    this.SetTotalPage();
  }
  SetTotalPage() {
    this.listPage = [];
    this.options.totalpage = Math.ceil(this.options.total / this.options.pz);
    this.options.mathP = this.options.totalpage / (10 * this.curentPage);
    this.curentPage = (Math.ceil(this.options.totalpage / this.options.mathP) - 10) / 10 + 1;
    for (let index = 1 + ((this.curentPage - 1) * 10); index <= this.curentPage * 10; index++) {
      if (index <= this.options.totalpage) {
        this.listPage.push({ pageNumber: index });
      }
    }
  }

 // Phân trang
 EndPage() {
  this.curentPage = Math.ceil(this.options.totalpage / 10);
  this.listPage = [];
  for (let index = (this.options.totalpage - (this.options.totalpage % 10)); index <= this.options.totalpage; index++) {
    if (index <= this.options.totalpage) {
      this.listPage.push({ pageNumber: index });
    }
  }
  this.options.p = 1 + (this.options.totalpage - (this.options.totalpage % 10));
}
StartPage() {
  this.curentPage = 1;
  this.listPage = [];
  for (let index = 1; index <= 10; index++) {
    if (index <= this.options.totalpage) {
      this.listPage.push({ pageNumber: index });
    }
  }
  this.options.p = 1;
  this.RePage();
}
MovePage(p: number) {
  if (p <= this.options.totalpage && p !== this.options.p) {
    this.options.p = p;
    this.RePage();
  }
}
NextLine() {
  this.listPage = [];
  this.curentPage = this.curentPage + 1;
  for (let index = 1 + ((this.curentPage - 1) * 10); index <= this.curentPage * 10; index++) {
    if (index <= this.options.totalpage) {
      this.listPage.push({ pageNumber: index });
    }
  }
  this.options.p = 1 + ((this.curentPage - 1) * 10);
  this.RePage();
}
BackLine() {
  this.listPage = [];
  this.curentPage = this.curentPage - 1;
  for (let index = 1 + ((this.curentPage) * 10 - 10); index <= this.curentPage * 10; index++) {
    if (index <= this.options.totalpage) {
      this.listPage.push({ pageNumber: index });
    }
  }
  this.options.p = 1 + ((this.curentPage) * 10 - 10);
  this.RePage();
}
RePage() {
this.rePage.emit( this.options.p);
}

}
