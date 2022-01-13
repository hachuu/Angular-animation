import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { SendbirdService } from '../sendbird.service';

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
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  animations: [
    trigger('animSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
  providers: [
    SendbirdService
  ]
})
export class SlideComponent implements OnInit {
  counter: number = 0;
  list: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  message: string = '';
  messageList: any[] = [];

  constructor(
    private sendbirdService: SendbirdService
  ) {
    this.sendbirdService.connect('skung', 'skung');
    this.sendbirdService.getChannel('sendbird_open_channel_4530_3e4cf0fa550916cfbb74347e4386d4382955fa57');
    this.sendbirdService.receiveMessage('skuung');
  }

  ngOnInit(): void {
    console.log(this.messageList);
    this.sendbirdService.receiveMsgObs.subscribe((msg: any) => {
      console.log(msg.message);
      this.messageList.push(msg);
      
    })
  }

  onNext() {
    if (this.counter != this.list.length - 1) {
      this.counter++;
    }
  }

  onPrevious() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  dateFormat(date: Date) {

    return new Date(date);
  }

  sendMessage() {
    this.messageList.push({'message': this.message, 'createdAt': new Date()});
    this.sendbirdService.sendMessage(this.message);
  }
  

}
// https://stackblitz.com/edit/angular-slide-left-and-right-with-animation?file=src%2Fapp%2Fapp.component.ts