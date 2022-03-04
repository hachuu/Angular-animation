import { style } from '@angular/animations';
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '.disabledAction',
})
export class DisabledActionDirective {

  elementTypes = ['input', 'select', 'butten', 'textarea'];

  constructor(private el: ElementRef) {
  }


  @HostListener('click', ['$event']) 
  onClick(event: any) {
    event.preventDefault();
    event.stopPropagation();
    console.log('왜이거 안먹냐')
  }

  @HostListener('keydown.enter', ['$event'])
  onKeydown(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  ngAfterViewInit() {
    if (this.elementTypes.indexOf(this.el.nativeElement.tagName.toLowerCase()) > -1) {
      this.el.nativeElement.setAttribute('disabled', 'disabled');
    } else {
      this.el.nativeElement.style.pointerEvents = 'none';
    }
  }
}
