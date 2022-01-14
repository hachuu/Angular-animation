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

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {header:["playerName","playerCountry","playerClub"]});

    myworksheet['!merges'] = [
      {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: 2,
        r: 0
      }
    },
    {
      s: {
        c: 1,
        r: 1
      },
      e: {
        c: 1,
        r: 4
      }
    }];
    
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
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }

}