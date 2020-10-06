import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tinhPointerror'
})
export class TinhPointerrorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
