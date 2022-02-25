import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[labelRadio]'
})
export class LabelRadioDirective {

  @Input('id') targetId?: string;
  @Output() labelRadioChecked: EventEmitter<boolean> = new EventEmitter();
  targetElement?: HTMLInputElement;

  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('tabindex', '0');
  }
  @HostListener('click', ['$event']) 
  onClick(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.radioClick();
  }
  
  // keydown enter hostlistener
  @HostListener('keydown.enter', ['$event'])
  onKeydownEnter(event: any) {
    this.radioClick();
  }

  ngAfterViewInit() {
    if (this.targetId) {
      this.targetElement = document.getElementById(this.targetId) as HTMLInputElement;
    }    
  }

  radioClick() {
    if (!this.targetElement ||this.targetElement.disabled) return;

    this.targetElement.click();
    this.labelRadioChecked.emit(this.targetElement.checked);
  }

}
