import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../common/common.service';

@Pipe({
  name: 'urlFileReplace'
})
export class UrlFileReplacePipe implements PipeTransform {
  constructor(
    private _commonService: CommonService
    ) {
  }
  transform(value: unknown): unknown {
    let url = '';
    url = this._commonService.replaceUrlImage(value);
  return url;
  }

}
