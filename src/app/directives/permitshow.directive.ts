import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPermitshow]'
})
export class PermitshowDirective {
  @Input() set appPermitshow(type: number) {
    if (type !== 2) {
      this._viewContainerRef.clear();
    } else {
      this._viewContainerRef.createEmbeddedView(this.b);
    }
  }
  constructor(
    private b: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef
  ) { }

}
