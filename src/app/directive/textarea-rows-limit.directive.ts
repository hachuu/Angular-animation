import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[textareaRowsLimit]'
})
export class TextareaRowsLimitDirective {

  @Input() rowLimit: number = 2;

  @HostListener('keydown.enter', ['$event'])
  onKeydownEnter(event: any) {
    const value = this.el.nativeElement.value;
    const rows = value.split('\n').length;
    if (rows >= this.rowLimit) {
      event.preventDefault();
      return;
    }
  }

  constructor(private el: ElementRef) { }

}
