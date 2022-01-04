import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab-slide',
  templateUrl: './tab-slide.component.html',
  styleUrls: ['./tab-slide.component.scss']
})
export class TabSlideComponent implements OnInit {


  @ViewChild('contents')
  elementRef!: ElementRef;
  bMove = false;
  startX = 0;
  scrollLeft: number = 0;
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

}
