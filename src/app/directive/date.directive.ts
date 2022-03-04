import { Directive, ElementRef, HostListener, Injector, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import Util from 'src/app/utils/util';

@Directive({
  selector: '[date]'
})
export class DateDirective {
  private model?: NgControl; // NgForm 사용 시 formControl도 제어

  constructor(private _el: ElementRef, @Self() injector: Injector) {
    try {
      this.model = injector.get(NgControl);
    } catch (error) { }
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {

    const initalValue = this._el.nativeElement.value;
    let newValue = initalValue;

    newValue = Util.dateFomatter(newValue, true);
    this._el.nativeElement.value = newValue;
    console.log(newValue)
    if (this.model && this.model.control) {
      this.model.control.setValue(newValue);
    }
  }

}
