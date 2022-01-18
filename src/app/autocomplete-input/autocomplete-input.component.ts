import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {

  @Input() itemList: Array<any> | undefined;
  @Input() placeholder = '입력';
  filterList: Array<any> = [];
  item = new FormControl();
  selectIndex = 0;

  @ViewChild("suggestListRef", { static: false })
  suggestListElRef: ElementRef | undefined;


  constructor() { }

  ngOnInit(): void {
  }

  selectHandler(data: any){
		this.item.setValue(data.text);
		this.filterList = [];
		this.selectIndex = 0;
	}

  keyDown(event: { keyCode: number; }) {
    let suggestListDom = null;
    let focusedIndex = null;
		let type = null;

    if(this.suggestListElRef != null) suggestListDom = this.suggestListElRef.nativeElement;
    focusedIndex = this.selectIndex;

    let suggestListItem = null;
    if (suggestListDom) suggestListItem = suggestListDom.querySelectorAll('li');

    if (event.keyCode !== 13 && event.keyCode !== 27 && event.keyCode !== 38 && event.keyCode !== 40 ) return;

		switch (event.keyCode) {
			case 13: // enter
				this.selectHandler(this.filterList[this.selectIndex]);
			  break;
			case 27: // escape
			  break;
			case 38: // up
        this.selectIndex--;
        if (this.selectIndex < 0) this.selectIndex = 0;
        suggestListItem[this.selectIndex].scrollIntoViewIfNeeded(true);
			  break;
			case 40: // down
				this.selectIndex++;
        if (this.selectIndex > suggestListItem.length - 1) this.selectIndex = suggestListItem.length - 1;
        suggestListItem[this.selectIndex].scrollIntoViewIfNeeded(false);
        break;
			default: return;
		}
  }

  listBlur(event: { target: { value: any; }; }){
    if (event.target.value) {
      this.filterList = [];
      return;
    }
	}

  setFilterList(event: { target: { value: any; }; }){
		
		if (!event) return;
    
    let keyword = event.target.value;
    if (!keyword || keyword.trim() === '') {
      this.filterList = [];
      return;
		}

    keyword = keyword.toUpperCase();
    this.filterList =  this.itemList ? this.itemList.filter(item => item.text.toUpperCase().includes(keyword)) : [];
	}
}
