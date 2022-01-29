import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[dropFile]'
})
export class DropFileDirective {

  fileName = '';
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('drop', ['$event']) ondrop(evt) {
    const files = evt.dataTransfer.files;
    if (files[0].size > 5000000) {
      console.log('파일은 5MB로 제한됩니다.')
    }
    if (files.length > 0) {
      this.fileName = files[0].name;
      // this.fileDropped.emit(files[0]);
    }
  }

  constructor(private el: ElementRef) {

  }

}
