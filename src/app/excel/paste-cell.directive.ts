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
        let pasteArr: any[] = this.trArr.length > this.rowIdx + i ? [...this.trArr[this.rowIdx + i]] : [];
        Array.from(this.trArr[0]).forEach((v, j) => {
          if (this.columnIdx+j < this.trArr[0].length) {
            const currentColumn = currentRow.split('\t')[j];
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
