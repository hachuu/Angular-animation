import { Component, OnInit } from '@angular/core';
import { ExcelService } from './excel.service';
import { mockDataArr } from './mock/mockDataArr';

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
  mockDataArr = mockDataArr;
  constructor(private excelService:ExcelService){
    this.mockDataHeader = Object.keys(this.mockDataArr[0]);
  }
  exportAsXLSX(): void {
    
    this.excelService.exportAsExcelFile(this.mockDataArr, 'user_data', this.mockDataHeader);
  }

}
