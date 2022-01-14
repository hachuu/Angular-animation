import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string, header?: string[]): void {

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, { header });

    myworksheet['!merges'] = this.mergeItem(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });

    console.group();
    console.log('myworksheet', myworksheet);
    console.log('myworkbook', myworkbook);
    console.log('excelBuffer', excelBuffer);
    console.groupEnd();

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, `${fileName}_exported${new Date()}${EXCEL_EXTENSION}`);
  }

  private mergeItem(json: any[]) {


    const originData = json;

    //if there is same value in the same column, merge them
    let mergeItem: any[] = [];
    const mergeItemIndex = [];
    const mergeItemValue: any[] = [];
    const mergeItemValueIndex: number[] = [];
    const mergeItemValueCellIndex: number[] = [];

    const start: {
      c: number,
      r: number
    } = { c: 0, r: 0 };
    const end: {
      c: number,
      r: number
    } = { c: 0, r: 0 };

    originData.forEach((item, i) => {
      const itemKeys = Object.keys(item);
      itemKeys.map((key, j) => {
        if (i !== 0 && item.hasOwnProperty(key) && item[key] === originData[i-1][key]) {
          mergeItemValueIndex.push(i);
          mergeItemValueCellIndex.push(j);
          console.log(`${i}, ${j}, : ${key}`);
          start.r = i;
          start.c = j;
          end.r = i+1;
          end.c = j;
          mergeItem.push({s: {c: start.c, r: start.r}, e: {c: end.c, r: end.r}});
        }
      })
    });

    console.log('mergeItem', mergeItem);
    return mergeItem;
  }

}