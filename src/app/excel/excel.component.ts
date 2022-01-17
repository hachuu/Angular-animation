import { Component, OnInit } from '@angular/core';
import { ExcelService } from './excel.service';
import { mockDataArr } from './mock/mockDataArr';

// interface StringMap { [index: string | number]: string | number }

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})

export class ExcelComponent implements OnInit {


  ngOnInit(): void {
  }

  title = 'exportExcelInAngular';
  mockDataHeader: string[] | undefined;
  mockDataArr: Array<{[index: string]: string | number} > = mockDataArr;
  
  // mockDataArr: Array<any> = mockDataArr;
  constructor(private excelService: ExcelService) {
    this.mockDataHeader = Object.keys(this.mockDataArr[0]);
    
  }
  exportAsXLSX(): void {

    this.excelService.exportAsExcelFile(this.mockDataArr, 'user_data', this.mockDataHeader);
  }

  renderListText(item: any, header: string): string | number {
    // return '';
    return item.hasOwnProperty(header) && item[header] ? item[header] : '';
  }

  // j: row, i: column
  renderBold(i: number, j: number): boolean {
    const data = this.excelService.removeBorderItemIdx(this.mockDataArr);
    console.log(this.excelService.removeBorderItemIdx(this.mockDataArr));
    return data.some(item => {
      // return ((item.s.r-2 < j && item.e.r >= j + 1) && item.s.c === i);
      return ((item.s.r-1 < j && item.e.r >= j + 1) && item.s.c === i);
    });
  }
}
