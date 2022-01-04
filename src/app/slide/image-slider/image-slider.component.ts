import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, query, style, animate, group, AnimationBuilder, AnimationPlayer } from '@angular/animations';
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
  @ViewChild('withBuilder')
  elementRef!: ElementRef;
  private player!: AnimationPlayer;

  private swipeCoord!: [number, number];
	private swipeTime!: number;


  isDrag = 'init';

  constructor(private animationBuilder: AnimationBuilder) { }
  
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
    this.isDrag = 'start';
    console.log(this.isDrag)
    this.drag(e, 'start');
  }

  onDragEnd(e:any ){
    this.isDrag = 'end';
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

  onDragOver(e:any){
    // this.toggle('dragover', e);
  }

  onDragStart2(e:any ){
    this.drag2(e, 'start');
  }

  onDragEnd2(e:any ){
    this.drag2(e, 'end');
  }


  drag2(e: DragEvent, when: string): void {
    const coord: [number, number] = [e.clientX, e.clientY];
		const time = new Date().getTime();

		if (when === 'start') {
			this.swipeCoord = coord;
			this.swipeTime = time;
		} else if (when === 'end') {
			const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
			const duration = time - this.swipeTime;

      console.log(Math.abs(direction[1] * 3));

			if (duration < 1000 //
				&& Math.abs(direction[0]) > 30
				&& Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
					const swipe = direction[0] < 0 ? 'next' : 'previous';
					if (swipe === 'next') {
            this.toggle('right');
            this.onNext();
					} else {
            this.toggle('left');
            this.onPrevious();
					}
			}
		}
  }

  toggle(type: string, e?: any) {
    this.createPlayer(type, e);
    this.player.play();
  }

  createPlayer(type: string, e: any) {
    if(this.player) {
      this.player.destroy();
    }

    let animationFactory;


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

    

    if(type === 'left') {
      animationFactory = this.animationBuilder
        .build([trigger('animImageSlider', [
          transition(':increment', right),
          transition(':decrement', left),
        ])])
    } else if(type === 'right') {
      animationFactory = this.animationBuilder
        .build([trigger('animImageSlider', [
          transition(':increment', right),
          transition(':decrement', left),
        ])])
    } else {
      const newThing = [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [style({ margin: `0 ${e.x}` }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
            optional: true,
          }),
        ]),
      ]
      animationFactory = this.animationBuilder
        .build([trigger('animImageSlider', [
          transition('* => *', newThing)
        ]),]);
    }

    this.player = animationFactory.create(this.elementRef.nativeElement);
  }
}