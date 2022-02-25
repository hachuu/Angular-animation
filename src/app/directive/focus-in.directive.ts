import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style } from '@angular/animations';
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[focusIn]'
})
export class FocusInDirective {
  player?: AnimationPlayer;
  fieldWidth: number;
  scaleFactor: number;

  @Input()
  set show(show: boolean) {
    if (this.player) {
      this.player.destroy();
    }

    if (!show) return;

    const metadata = show && this.focusIn();

    const factory = this.builder.build(metadata);
    const player = factory.create(this.el.nativeElement);

    player.play();
  }


  constructor(private builder: AnimationBuilder, private el: ElementRef) {
    this.fieldWidth = this.el.nativeElement.offsetWidth;
    this.scaleFactor = this.fieldWidth + 10 / this.fieldWidth;
  }

  private focusIn(): AnimationMetadata[] {
    setTimeout(() => {
      this.el.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    }, 100);
    return [
      style({ opacity: 0, transform: `scale(${this.scaleFactor})` }),
      animate('400ms', style({ opacity: 1, transform: `scaleX(${this.scaleFactor})`}))
    ];
  }

}
