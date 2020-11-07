import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { CommonService } from '../common/common.service';

@Pipe({
  name: 'doubletoDate'
})
export class DoubletoDatePipe implements PipeTransform {
  constructor(
    private _common: CommonService
  ) {

  }
  transform(value: unknown, ...args: unknown[]): unknown {
    if (isNaN(value as number)) {
      return null;
    }
    const date = this._common.FromDoubleToDate(Number(value));
    const datestring = moment(date).format('DD/MM/yyyy');
    return datestring;
  }

}
