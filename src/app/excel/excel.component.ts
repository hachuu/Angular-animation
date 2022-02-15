import { Component, HostListener, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
// import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

import { ExcelService } from './excel.service';
import { mockDataArr } from './mock/mockDataArr';

// interface StringMap { [index: string | number]: string | number }

export interface PasteArr {
  [index: string]: string;
}

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


  //초기 array;
  // pasteArr: PasteArr[] = new Array(12); // column 개수로 array 생성
  // trArr :PasteArr[][] = new Array(5); // table에 기본 세팅될 length로 array 생성

  pastedArray = Array.from(Array(5), () => Array(12).fill(null));

  
  // mockDataArr: Array<any> = mockDataArr;
  constructor(private excelService: ExcelService) {
    this.mockDataHeader = Object.keys(this.mockDataArr[0]);
  }
  exportAsXLSX(): void {

    this.excelService.exportAsExcelFile(this.mockDataArr, 'user_data', this.mockDataHeader);
  }

  generatePdf() {
    var pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text('Angular PDF Table', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);


    (pdf as any).autoTable({
    head: [['ID', 'Name', 'Email', 'Profile']],
    body: [
      [1, 'John', 'john@yahoo.com', 'HR'],
      [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
      [3, 'Harry', 'harry@yahoo.com', 'Finance'],
      [4, 'Anne', 'anne@yahoo.com', 'Sales'],
      [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
      [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
      [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
      [8, 'Lil', 'lil@yahoo.com', 'Sales']
    ],
    theme: 'plain',
    didDrawCell: (data: { column: { index: any; }; }) => {
        console.log(data.column.index)
      }
    })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc  
    pdf.save('table.pdf');
  }


  renderListText(item: any, header: string): string | number {
    return item.hasOwnProperty(header) && item[header] ? item[header] : '';
  }

  // j: row, i: column
  renderBold(i: number, j: number): boolean {
    const data = this.excelService.removeBorderItemIdx(this.mockDataArr);
    return data.some(item => {
      return ((item.s.r-1 < j && item.e.r >= j + 1) && item.s.c === i);
    });
  }

  setPasteDataArr($event: any) {
    this.pastedArray = $event;
  }
}
