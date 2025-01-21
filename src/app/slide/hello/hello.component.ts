import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; background-color: beige; }`],
  standalone: false,
})
export class HelloComponent  {
  @Input() name: string | undefined;
}
