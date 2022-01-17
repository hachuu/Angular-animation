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

    myworksheet['!merges'] = this.merges(json);
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

  public removeBorderItemIdx (json: any[]) {

    return this.merges(json);

  }

  private merges (json: any[]) {

    const originData = json;
    const keys: string[] = Object.keys(originData[0]);

    const start: {c: number, r: number} = {c: 0, r: 0};
    const end: {c: number, r: number} = {c: 0, r: 0};
    let keyMerged: any[] = [];
    keys.forEach((key, c) => {
      const merged: Array<{s: typeof start, e: typeof end}> = [];
      originData.forEach((item, r) => {

        if (r !== 0 && item[key] === originData[r - 1][key]) {
          if (merged.length && merged[merged.length-1].e.r === r) {
            merged[merged.length-1].e.c = c;
            merged[merged.length-1].e.r = r+1;
          } else {
            merged.push({s: {r : r, c: c}, e: {r: r+1, c: c}});
          }
        }
      });
      keyMerged = [...keyMerged, ...merged];
    });
    return keyMerged;
  }
}