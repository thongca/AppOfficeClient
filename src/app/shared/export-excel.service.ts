import { HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { ReportDate } from '../models/giaoviec/reportdate.model';
import { ApiService } from './api.service';
import { ApifileService } from './apifile.service';
@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  file: File;
  constructor(
    private apiFile: ApifileService,
    private _apiService: ApiService,
    private toarts: ToastrService,
  ) { }
  public exportExcel(jsonData: any, fileName: string, type: number, UserId: number, report: ReportDate): void {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    if (type === 1) {
      this.saveExcelFileKPI(excelBuffer, fileName, UserId, report);
    } else if (type === 2) {
      this.saveExcelFileNKCV(excelBuffer, fileName, UserId, report);
    } else {
      this.saveExcelFileTotalWork(excelBuffer, fileName, UserId, report);
    }
  }
  private blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }
  public saveExcelFileTotalTime(model, fileName): void {
    this._apiService.r1_File_Data_Model_General(model, 'api/MyWorkReport/ExportSumTimeExcel').subscribe(res => {
        saveAs(res, fileName + this.fileExtension);
    });
  }

  private saveExcelFileKPI(buffer: any, fileName: string, UserId: number, report: ReportDate): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    const myFile = this.blobToFile(data, 'myfile.xlsx');
    const model = {
      UserId: UserId,
      ReportDate: report
    };
    this.apiFile.r2_addonlyFileExcel(myFile, model, 'api/MyWorkReport/r1ExcelKpi').subscribe(res => {
      if (res.type === HttpEventType.Response) {
        if (res.status === 404) {
          this.toarts.error('Xuất File không thành công!');
          return;
        }
        saveAs(res['body'], fileName + this.fileExtension);
      }
    });
  }
  private saveExcelFileNKCV(buffer: any, fileName: string, UserId: number, report: ReportDate): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    const myFile = this.blobToFile(data, 'myfile.xlsx');
    const model = {
      UserId: UserId,
      ReportDate: report
    };
    this.apiFile.r2_addonlyFileExcel(myFile, model, 'api/MyWorkReport/ExportNkCvExcel').subscribe(res => {
      if (res.type === HttpEventType.Response) {
        if (res.status === 204) {
          this.toarts.error('Xuất File không thành công!');
          return;
        }
        saveAs(res['body'], fileName + this.fileExtension);
      }
    });
  }
  private saveExcelFileTotalWork(buffer: any, fileName: string, UserId: number, report: ReportDate): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    const myFile = this.blobToFile(data, 'myfile.xlsx');
    const model = {
      UserId: UserId,
      ReportDate: report
    };
    this.apiFile.r2_addonlyFileExcel(myFile, model, 'api/MyWorkReport/ExportTotalWorkExcel').subscribe(res => {
      if (res.type === HttpEventType.Response) {
        if (res.status === 204) {
          this.toarts.error('Xuất File không thành công!');
          return;
        }
        saveAs(res['body'], fileName + this.fileExtension);
      }
    });
  }
}
