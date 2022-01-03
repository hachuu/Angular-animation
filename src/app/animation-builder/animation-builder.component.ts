import { AnimationPlayer, AnimationBuilder, style, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animation-builder',
  templateUrl: './animation-builder.component.html',
  styleUrls: ['./animation-builder.component.scss']
})
export class AnimationBuilderComponent implements OnInit {

  isOpen = true;
  get collapseState() {
    return this.isOpen ? 'open' : 'close';
  }
  @ViewChild('withBuilder')
  elementRef!: ElementRef;
  private player!: AnimationPlayer;

  constructor(private animationBuilder: AnimationBuilder) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

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
