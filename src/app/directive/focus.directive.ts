import { Directive, ElementRef, Input, AfterViewChecked  } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements AfterViewChecked {

  @Input('focus') focus: boolean = false;

  constructor(private el: ElementRef) {}

  ngAfterViewChecked() {
    if (this.focus) {
      this.el.nativeElement.focus();
      this.el.nativeElement.checked;
    }
  }
}
