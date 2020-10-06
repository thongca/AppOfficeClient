import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedmyworksService {
  listVois =
  [
   { Id: 0, Name: '----- Chọn độ vội -----' },
   { Id: 1.0, Name: 'Bình thường' },
   { Id: 1.1, Name: 'Vội' },
   { Id: 1.2, Name: 'Rất vội' },
 ];
 listKhos = [
   { Id: 0, Name: '----- Chọn độ khó -----' },
   { Id: 0.9, Name: 'Dễ' },
   { Id: 1.0, Name: 'Trung bình' },
   { Id: 1.1, Name: 'Khó' },
   { Id: 1.2, Name: 'Rất khó' },
 ];
  constructor() { }
}
export class DoVoi {
  Id: number;
  Name: String;
  }
  export class DoKho {
    Id: number;
    Name: String;
}
