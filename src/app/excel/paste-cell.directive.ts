import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appPasteCell]'
})
export class PasteCellDirective {

  @Input() rowIdx: number = 0;
  @Input() columnIdx: number = 0;
  @Input() trArr!: any[];
  @Output() pasteArrEmit = new EventEmitter();

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    // console.log('paste event', event);
    let pastedInput: string | undefined = event.clipboardData?.getData('text/plain');//replace(/\D/g, '');
    // console.log(event.clipboardData?.files[ 0 ]);
    console.log(pastedInput);
    // console.log(pastedInput?.split('\n'));

    const tr = pastedInput?.split('\n') || [];
    let trLength: number = !!tr && tr.length-1;
    tr.forEach((v, i) => {
      if (v) {
        const currentRow = tr[i];
        let pasteArr: string[] = [];
        Array.from(this.trArr[0]).forEach((v, j) => {
          if (this.columnIdx+j < this.trArr[0].length) {
            const currentColumn = currentRow.split('\t')[j];
            pasteArr[this.columnIdx+j]= currentColumn;
            console.log(pasteArr);
          }
        });

        // console.log(this.trArr[i]);
        // [columnIdx, currentColumn.length -1]
        this.trArr[this.rowIdx + i] = pasteArr;
      }
    });
    
    // const pasteArr = pastedInput?.split('	');
    // console.log(pasteArr);
    
    // let trArr = new Array(trLength);
    // console.log('trLength', trLength);
    // console.log(pasteArr);


    // console.log('rowIdx ', this.rowIdx);
    // console.log('columnIdx ', this.columnIdx);

    // this.trArr[this.rowIdx] = this.tdArr;
    // this.trArr[this.trArr.length || 0] = this.pasteArr;
    console.log(this.trArr);
    this.pasteArrEmit.emit(this.trArr);
  }

  constructor() { }

}
