import { HashCodeService } from './../common/hashCode.service';
import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appPermitexport]'
})
export class PermitexportDirective {
  private urlActive: string;
  private listPermi: any[];
  constructor(
    private b: TemplateRef<any>,
    private route: Router,
    private _hashCodeS: HashCodeService,
    private _viewContainerRef: ViewContainerRef
  ) {
    this.urlActive =  this.route.url;
    this.listPermi = JSON.parse(this._hashCodeS.decrypt(localStorage.getItem('listQuyen')));
  }
  @Input() set appPermitexport(type: boolean) {
    if (type === true) {
      if (this.listPermi !== undefined) {
        const listPerbyUrladd = this.listPermi.filter(x => x.routerLink === this.urlActive && x.ExportPer === true);
        if (listPerbyUrladd.length === 0) {
          this._viewContainerRef.clear();
        } else {
          this._viewContainerRef.createEmbeddedView(this.b);
        }
      }
    }
   }
}
