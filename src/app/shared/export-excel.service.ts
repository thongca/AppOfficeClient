import { HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { BaseUrlService } from '../common/base-url.service';
import { ApifileService } from './apifile.service';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  file: File;
  constructor(
    private apiFile: ApifileService
  ) { }
  public exportExcel(jsonData: any, fileName: string, type: number): void {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    if (type === 1) {
      this.saveExcelFileKPI(excelBuffer, fileName);
    } else {
      this.saveExcelFileNKCV(excelBuffer, fileName);
    }
  }
  private blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }
  private saveExcelFileKPI(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    const myFile = this.blobToFile(data, 'myfile.xlsx');
    this.apiFile.r2_addonlyFile(myFile, 'api/MyWorkReport/r1ExcelKpi').subscribe(res => {
      if (res.type === HttpEventType.Response) {
        saveAs(res['body'], fileName + this.fileExtension);
      }
    });
  }
  private saveExcelFileNKCV(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    const myFile = this.blobToFile(data, 'myfile.xlsx');
    this.apiFile.r2_addonlyFile(myFile, 'api/MyWorkReport/ExportNkCvExcel').subscribe(res => {
      if (res.type === HttpEventType.Response) {
        saveAs(res['body'], fileName + this.fileExtension);
      }
    });
  }
}
