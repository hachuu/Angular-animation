import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Directive({
  selector: '[dropFile]'
})
export class DropFileDirective {

  fileName = '';
  tempImgUrl!: SafeUrl; // img attr.src 매핑 url
  
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('drop', ['$event']) ondrop(evt: { dataTransfer: { files: any; }; }) {
    const files = evt.dataTransfer.files;
    if (files[0].size > 5000000) {
      console.log('파일은 5MB로 제한됩니다.')
    }
    if (files.length > 0) {
      this.fileName = files[0].name;
      this.fileDropped.emit(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files)
      reader.onloadend = async (evt) => {
        if (evt.target && evt.target.readyState === FileReader.DONE) {
          const arrayBuffer = evt.target.result;
          const base64Response = await fetch(`${arrayBuffer}`);
          const blob = await base64Response.blob();
          this.tempImgUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
        }
      }
    }
  }

  constructor(
    private el: ElementRef,
    private domSanitizer: DomSanitizer
    ) {

  }

}
