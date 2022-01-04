import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  animations: [
    trigger('animImageSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ]
})
export class ImageSliderComponent implements OnInit {
  counter: number = 0;
  images = [
    'https://placeimg.com/300/300/nature/6',
    'https://placeimg.com/300/300/nature/7',
    'https://placeimg.com/300/300/nature/8',
    'https://placeimg.com/300/300/nature/9',
    'https://placeimg.com/300/300/nature/2',
    'https://placeimg.com/300/300/nature/3',
    'https://placeimg.com/300/300/nature/1',
  ];
  textList = [
    'slide 1',
    'slide 2',
    'slide 3',
    'slide 4',
    'slide 5',
    'slide 6',
    'slide 7',
  ];

  private swipeCoord!: [number, number];
	private swipeTime!: number;
  constructor() { }

  ngOnInit() {
  }

  onNext() {
    // if (this.counter != this.textList.length - 1) {
    //   this.counter++;
    // } else {
    //   this.counter = 0;
    // }
    this.counter++;
  }

  onPrevious() {
    // if (this.counter > 0) {
    //   this.counter--;
    // } else {
    //   this.counter = this.textList.length - 1;
    // }
    this.counter--;
  }

  swipe(e: TouchEvent, when: string): void {
		const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
		const time = new Date().getTime();
	

    console.log(coord);
		if (when === 'start') {
			this.swipeCoord = coord;
			this.swipeTime = time;
		} else if (when === 'end') {
			const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
			const duration = time - this.swipeTime;
	
			if (duration < 1000 //
				&& Math.abs(direction[0]) > 30
				&& Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
					const swipe = direction[0] < 0 ? 'next' : 'previous';
					if (swipe === 'next') {
						this.onNext();
					} else {
						this.onPrevious();
					}
			}
		}
	}

  onDragStart(e:any ){
    this.drag(e, 'start');
  }

  onDragEnd(e:any ){
    this.drag(e, 'end');
  }

  drag(e: DragEvent, when: string): void {
    const coord: [number, number] = [e.clientX, e.clientY];
		const time = new Date().getTime();

		if (when === 'start') {
			this.swipeCoord = coord;
			this.swipeTime = time;
		} else if (when === 'end') {
			const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
			const duration = time - this.swipeTime;

			if (duration < 1000 //
				&& Math.abs(direction[0]) > 30
				&& Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
					const swipe = direction[0] < 0 ? 'next' : 'previous';
					if (swipe === 'next') {
						this.onNext();
					} else {
						this.onPrevious();
					}
			}
		}
  }
}