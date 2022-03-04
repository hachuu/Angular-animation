import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[labelChecked]'
})
export class LabelCheckedDirective {

  @Input('id') targetId?: string;
  @Output() labelCheckedEmit = new EventEmitter<boolean>();
  targetElement?: HTMLInputElement;


  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('tabindex', '0');
  }
  @HostListener('click', ['$event']) 
  onClick(event: any) {
    event.stopPropagation();
    event.preventDefault();
    if (this.targetElement?.disabled || !this.targetElement) return;

    this.targetElement.checked = !this.targetElement?.checked;
    this.labelCheckedEmit.emit(this.targetElement?.checked);
  }
  
  @HostListener('keydown.enter', ['$event'])
  onKeydownEnter(event: any) {
    if (this.targetElement?.disabled || !this.targetElement) return;

    this.targetElement.checked = !this.targetElement?.checked;
    this.labelCheckedEmit.emit(this.targetElement?.checked);
  }

  ngAfterViewInit() {
    if (this.targetId) {
      this.targetElement = document.getElementById(this.targetId) as HTMLInputElement;
    }    
  }
}
