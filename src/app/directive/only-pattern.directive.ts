import { Directive, ElementRef, HostListener, Injector, Input, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import Util from 'src/app/utils/util';

@Directive({
  selector: 'input[onlyPattern]'
})
export class OnlyPatternDirective {

  @Input() regExp?: string;
  constructor(private _el: ElementRef, @Self() injector: Injector) {
    try {
      this.model = injector.get(NgControl);
    } catch (error) { }
  }
  private model?: NgControl; // NgForm 사용 시 formControl도 제어

  @HostListener('input') onInputChange(event: any) {
    if (!this.regExp) {
      return;
    }

    const initalValue = this._el.nativeElement.value;
    let newValue = initalValue.replace(new RegExp(this.regExp), '');
    this._el.nativeElement.value = newValue;
    if (this.model && this.model.control) {
      this.model.control.setValue(newValue);
    }
  }
}
