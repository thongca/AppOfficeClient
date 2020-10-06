import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-input-file-image',
  templateUrl: './input-file-image.component.html',
  styleUrls: ['./input-file-image.component.css']
})
export class InputFileImageComponent implements OnInit {
  @Input() srcImage: any;
  @Input() heightImage: any;
  @Input() widthImage: any;
  @Output() changeImage = new EventEmitter();
  _files: any;
  imagePath: string;
  imgURL: any;
  constructor() { }

  ngOnInit(): void {
    this.imgURL = this.srcImage === undefined ? '/assets/img/brand/art-and-design.svg' : this.srcImage;
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }
    // tslint:disable-next-line:prefer-const
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this._files = files;
    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    this.changeImage.emit(this._files);
  }

  openAttachfile (check) {
    if (check === 'works') {
        $('input.inputimgFileWorks').click();
    }
}
}
