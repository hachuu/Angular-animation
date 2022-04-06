
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  isDraged: boolean | undefined = undefined;
  constructor(private _elementRef: ElementRef) {
  }

  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      if (this.isDraged === undefined) {
        this.clickOutside.emit(targetElement);
      } else {
        this.isDraged = undefined;
      }
    }
  }

  @HostListener('mousedown', ['$event'])
  public onMousedown(evt: { preventDefault: () => void; stopPropagation: () => void; }) {
    this.isDraged = true;
  }

  @HostListener('mouseup', ['$event'])
  public onMouseup(evt: { preventDefault: () => void; stopPropagation: () => void; }) {
    this.isDraged = undefined;
  }
}