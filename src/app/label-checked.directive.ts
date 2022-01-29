import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[labelChecked]'
})
export class LabelCheckedDirective {

  @Input('id') targetId: string;
  @Output() labelCheckedEmit = new EventEmitter<boolean>();
  targetElement: HTMLInputElement;


  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('tabindex', '0');
  }
  @HostListener('click', ['$event']) 
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.targetElement.checked = !this.targetElement.checked;
    this.labelCheckedEmit.emit(this.targetElement.checked);
  }
  
  @HostListener('keydown.enter', ['$event'])
  onKeydownEnter(event) {
    this.targetElement.checked = !this.targetElement.checked;
    this.labelCheckedEmit.emit(this.targetElement.checked);
  }

  ngAfterViewInit() {
    this.targetElement = document.getElementById(this.targetId) as HTMLInputElement;
  }
}
