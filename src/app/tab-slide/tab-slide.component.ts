import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab-slide',
  templateUrl: './tab-slide.component.html',
  styleUrls: ['./tab-slide.component.scss'],
  standalone: false
})
export class TabSlideComponent implements OnInit {


  @Input() menuList = [
    '첫번째', 
    '두번째',
    '세번째',
    '네번째',
    '다섯번째',
    '여섯번째',
    '일곱번째',
    '여덟번째',
    '아홉번째',
    '열번째',
    '열한번째',
  ];
  @ViewChild('contents')
  elementRef!: ElementRef;
  bMove = false;
  startX = 0;
  scrollLeft: number = 0;
  activeIndex: number = 0;
  constructor() { }

  ngOnInit(): void {

  }
  mousedown(event: any) {
    this.bMove = true;
		this.startX = event.pageX || event.touches[0].pageX;
		this.scrollLeft = this.elementRef.nativeElement.scrollLeft;
  }

  mouseup(e: any) {
    // console.log(e)
    this.bMove = false;
  }

  mouseleave(e: any) {
    // console.log(e)
    this.bMove = false;
  }

  mousemove(e: any) {
    if(this.bMove )
      {
        const x = (e.pageX || e.touches[0].pageX) - this.elementRef.nativeElement.offsetLeft;
        const walk = x - this.startX;
        this.elementRef.nativeElement.scrollLeft = this.scrollLeft - walk;
      }
  }

  activateMenu(i: number) {
    this.activeIndex = i;
  }

}
