import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  initBodyHtml!: string;
  constructor() { }

  ngOnInit(): void {
  }

  // 출처: https://maks.tistory.com/entry/Javascript로-특정-영역-인쇄하기-IE11-포함 [1번도로 야생의 개발자]
  printElement(elementRef: HTMLElement = document.getElementById('print') as HTMLElement) {
    // let app = document.getElementById('app') as HTMLElement;
    const printContents = elementRef.innerHTML;
    let printDiv = document.createElement('DIV') as HTMLElement;
    document.body.appendChild(printDiv);
    printDiv.innerHTML = printContents ;
    // app.style.display = 'none';
    window.print();
    // app.style.display = 'block'; 
    printDiv.style.display = 'none'; 
    printDiv.innerHTML = '';
  }
  
  print () {
    window.print();
  }

  beforePrint() {
    this.initBodyHtml = document.body.innerHTML;
    document.body.innerHTML = document.getElementById('print')?.innerHTML || '';
  }

  afterPrint() {
    document.body.innerHTML = this.initBodyHtml;
  }


  ngAfterViewInit() {
    window.onbeforeprint = this.beforePrint || null;
    window.onafterprint = this.afterPrint || null;
  }


}
