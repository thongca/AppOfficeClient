import { PermitList } from './../common/menu';
import { HashCodeService } from './../common/hashCode.service';
import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appPermitdel]'
})
export class PermitdelDirective {
  private urlActive: string;
  private listPermi: PermitList[];
  constructor(
    private b: TemplateRef<any>,
    private route: Router,
    private _hashCodeS: HashCodeService,
    private _viewContainerRef: ViewContainerRef
  ) {
    this.urlActive =  this.route.url;
    this.listPermi = JSON.parse(this._hashCodeS.decrypt(localStorage.getItem('listQuyen')));
  }
  @Input() set appPermitdel(type: boolean) {
    if (type === true) {
      if (this.listPermi !== undefined) {
        const listPerbyUrladd = this.listPermi.filter(x => x.RouterLink === this.urlActive && x.DelPer === true);
        if (listPerbyUrladd.length === 0) {
          this._viewContainerRef.clear();
        } else {
          this._viewContainerRef.createEmbeddedView(this.b);
        }
      }
    }
   }
}
