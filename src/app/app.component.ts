import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  standalone: false,
})
export class AppComponent implements AfterViewInit  {
  isOpen = true;
  get collapseState() {
    return this.isOpen ? 'open' : 'close';
  }
  @ViewChild('withBuilder')
  elementRef!: ElementRef;
  private player!: AnimationPlayer;

  constructor(private animationBuilder: AnimationBuilder) { }

  ngAfterViewInit() { }

  createPlayer() {
    if(this.player) {
      this.player.destroy();
    }

    let animationFactory;

    if(this.isOpen) {
      animationFactory = this.animationBuilder
        .build([
          style({ width: '*' }),
          animate(200, style({ width: 0 }))
        ]);
    } else {
      animationFactory = this.animationBuilder
        .build([
          style({ width: 0 }),
          animate(200, style('*'))
        ]);
    }

    this.player = animationFactory.create(this.elementRef.nativeElement);
  }

  toggle() {
    this.createPlayer();
    this.player.play();

    this.isOpen = !this.isOpen;
  }
}
