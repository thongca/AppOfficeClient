import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { viLocale } from 'ngx-bootstrap/locale';
import { DatePipe } from '@angular/common';
defineLocale('vi', viLocale);
@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css']
})
export class InputDateComponent implements OnInit {
  @Input() label: string;
  @Input() require: string;
  @Output() changeDate = new EventEmitter();
  requireLocal: boolean;
  dateSelect: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(
    private datelageService: BsLocaleService,
  ) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY',
        minDate: new Date()
      }
      );
    this.datelageService.use('vi');
   }

  ngOnInit(): void {
    if (this.require !== undefined) {
      this.requireLocal = JSON.parse(this.require);
    }
  }
  onOpenCalendar(container) {

    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('day');
   }
   dateChange() {
    this.changeDate.emit(this.dateSelect);
   }
}
