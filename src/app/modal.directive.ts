import { Directive, EventEmitter, HostListener, Input, Output, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
  selector: '[modal]',
  standalone: false,
})
export class ModalDirective implements OnChanges {

  @Input() modal!: boolean;
  @Input() id!: string;
  @Output() closeEmit = new EventEmitter();

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (event.target.classList.contains('modal-close') || event.target.classList.contains('btn-lg')) {
      const input = document.getElementById(this.id) as HTMLInputElement;
      this.closeEmit.emit();
      input.checked= false;
    } else {
      if (!event.target.classList.contains('input')) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
    }
  }

  @HostListener('keydown.enter', ['$event'])
  onKeyupEnter(event: any) {
    if (event.target.classList.contains('modal-close') || event.target.classList.contains('btn-lg')) {
      const input = document.getElementById(this.id) as HTMLInputElement;
      this.closeEmit.emit();
      input.checked= false;
    } else {
      console.log(event.target.type);
      if (!event.target.classList.contains('input')) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
    }
  }


  // hostlistener tab key
  @HostListener('keydown.tab', ['$event'])
  onKeydownTab(event: any) {
  }

  constructor(
  ) {}

  ngOnChanges(change: SimpleChanges) {
    if (change.modal.currentValue !== change.modal.previousValue) {
      this.controlBodyClass();
    }
  }

  controlBodyClass() {
    if (this.modal) {
      document.body.classList.add('hidden');
    } else {
      document.body.classList.remove('hidden');
    }
  }
}
