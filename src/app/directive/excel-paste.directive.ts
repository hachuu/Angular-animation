import { Directive, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[excelPaste]'
})
export class ExcelPasteDirective {

  
  @Input() rowIdx: number = 0;
  @Input() columnIdx: number = 0;
  @Input() trArr!: any[];
  @Output() pasteArrEmit = new EventEmitter();

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    let pastedInput: string | undefined = event.clipboardData?.getData('text/plain');//replace(/\D/g, '');
    console.log(this.rowIdx, this.columnIdx);
    console.log(this.trArr);

    const tr = pastedInput?.split('\n') || [];
    let trLength: number = !!tr && tr.length-1;
    tr.forEach((v, i) => {
      if (v) {
        const currentRow = tr[i];
        // const initArray = new Array(this.trArr[0]).fill('')
        // let pasteArr: any[] = this.trArr.length > this.rowIdx + i ? [...this.trArr[this.rowIdx + i]] : ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        let pasteArr: any[] = this.trArr.length > this.rowIdx + i ? [...this.trArr[this.rowIdx + i]] : [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
        Array.from(this.trArr[0]).forEach((v, j) => {
          if (this.columnIdx+j < this.trArr[0].length) {
            const currentColumn = currentRow.split('\t')[j] || '';
            pasteArr[this.columnIdx+j]= currentColumn || pasteArr[this.columnIdx+j];
          }
        });
        this.trArr[this.rowIdx + i] = pasteArr;
      }
    });
    console.log(this.trArr);
    this.pasteArrEmit.emit(this.trArr);
  }

  constructor() { }
}
