import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'count-bomb',
  templateUrl: './count-bomb.component.html',
  styleUrls: ['./count-bomb.component.scss'],
})
export class CountBombComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}

  arr: Subscription[] = [];
  secArr: string[] = [];
  keyupmethod(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
      let value = event.target.value;
      const regexp = /^[1-9]*$/;
      if (regexp.test(value)) {
        this.arr.push(value);
        this.secArr.push(value);
        event.target.value = '';
      }
    }
  }

  getSec(sec: any, index: number) {
    const duration = sec * 1000;
    const interval$ = interval(1000);
    interval$.pipe(takeUntil(timer(duration))).subscribe((value: any) => {
      const oneSec = value * 1000;
      const currentSec = duration - oneSec;
      this.secArr[index] = `${currentSec / 1000}초`;
      if (currentSec <= 0) {
        this.arr[index].unsubscribe();
        this.arr.splice(index, 1);
        this.secArr.splice(index, 1);
        return;
      }
      // return currentSec;
    });
  }
}
