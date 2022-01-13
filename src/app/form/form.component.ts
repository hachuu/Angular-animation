import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  ngOnInit(): void {
  }

  panelOpenState = false;
  itemText: string = '';

  todo = [
    {title: 'Get to work', isOpen: false, value: ''},
    {title: 'Pick up groceries', isOpen: false, value: ''},
    {title: 'Go home', isOpen: false, value: ''},
    {title: 'Fall asleep', isOpen: false, value: ''},
  ];

  done = 
  [
    {title: 'Get up', isOpen: false, value: ''},
    {title: 'Brush teeth', isOpen: false, value: ''},
    {title: 'Take a shower', isOpen: false, value: ''},
    {title: 'Check e-mail', isOpen: false, value: ''},
    {title: 'Walk dog', isOpen: false, value: ''},
  ]

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  activeOverlay(item: any) {
    item.isOpen = !item.isOpen;
    this.done.forEach(doneItem => {
      if (doneItem !== item) {
        doneItem.isOpen = false
      }
    })
  }

  confirmValue(item: any) {
    if (this.itemText) {
      item.value = this.itemText;
    }
    item.isOpen = false;
    this.itemText = '';
  }
}
