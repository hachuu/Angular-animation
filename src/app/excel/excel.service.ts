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

    const header = Object.keys(json[0]);
    
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {header});

    myworksheet['!merges'] = this.merges(json);

    
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });


    console.group();
    console.log('myworksheet', myworksheet);
    console.log('myworkbook', myworkbook);
    console.log('excelBuffer', excelBuffer);
    console.groupEnd();

    // this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }

  private merges (json: any[]) {

    const originData = json;
    const keys: string[] = Object.keys(originData[0]);

    // find same col, row value of originData
    const sameCol: any[] = [];
    const sameRow: any[] = [];
    const sameColRow: any[] = [];

    // for (let i = 0; i < originData.length; i++) {
    //   for (let j = 0; j < keys.length; j++) {
    //     if (originData[i][keys[j]] === originData[i + 1][keys[j]]) {
    //       sameCol.push(keys[j]);
    //     }
    //   }
    // }

    // console.log(sameCol);
    const start: {c: number, r: number} = {c: 0, r: 0};
    const end: {c: number, r: number} = {c: 0, r: 0};
    let keyMerged: any[] = [];
    keys.forEach((key, c) => {
      const merged: Array<{s: typeof start, e: typeof end}> = [];
      originData.forEach((item, r) => {

        if (r !== 0 && item[key] === originData[r - 1][key]) {
          start.c = c
          start.r = r - 1;
          end.c = c;
          end.r = r;
          // console.log(start, end);
          // console.log(merged[merged.length-1])
          if (merged.length && merged[merged.length-1].e.r === r - 1) {
            merged[merged.length-1].e.c = c;
            merged[merged.length-1].e.r = r;
            // console.log(merged);
          } else {
            // console.log(start, end)
            // console.log({s: {r : r-1, c: c}, e: {r: r, c: c}})
            merged.push({s: {r : r-1, c: c}, e: {r: r, c: c}});
          }
        } else {
          // merged.pop();
          // merged.push({s: {c: c, r: r}, e: {c: c, r: r}});
          // console.log(merged);
        }

        //  else {
        //   start.r = r;
        //   start.c = c;
        //   merged.push({s: start, e: end});
        // }
        console.log(merged);
        
      });
      keyMerged = [...keyMerged, ...merged];
      console.log(keyMerged)
    });

    // return [
    //   {
    //   s: {
    //     c: 0,
    //     r: 0
    //   },
    //   e: {
    //     c: 2,
    //     r: 0
    //   }
    // },
    // {
    //   s: {
    //     c: 1,
    //     r: 1
    //   },
    //   e: {
    //     c: 1,
    //     r: 4
    //   }
    // }];
    return keyMerged;
  }

}