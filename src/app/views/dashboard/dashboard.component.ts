import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ApiService } from '../../shared/api.service';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(
    private api: ApiService
  ) {

  }
  @ViewChild('revenueLineChart', { static: false }) chart: ElementRef;
  listDataDV: DVBieuDo[];
      // total
      canvas: any;
      ctx: any;
  ngOnInit() {
    // this.r1_ListDataWorkTimeInDepartment();
  }
  r1_ListDataWorkTimeInDepartment() {
    this.api.r1_Get_List_Data('api/MyWorkReport/r1WorkTimeForDepartment').subscribe(res => {
      this.listDataDV = res['data'];
      // this.barChartDV();
    });
  }
  // barChartDV() {
  //     this.canvas = document.getElementById('myChartDV');
  //     this.ctx = this.canvas.getContext('2d');
  //     const myChart = new Chart(this.ctx, {
  //       type: 'bar',
  //       data: {
  //         labels: this.listDataDV.map((item) => item.FullName),
  //         datasets: [{
  //           label: 'Số giờ làm việc',
  //           data: this.listDataDV.map((item) => item.PointCount),
  //           backgroundColor: [
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //             '#20a8d8',
  //           ],
  //           borderWidth: 1
  //         }]
  //       },
  //       options: {
  //         scales: {
  //           yAxes: [{
  //             type: 'linear',
  //             position: 'left',
  //             id: 'y-axis-1',
  //             stacked: true,
  //             ticks: {
  //               suggestedMin: 0
  //             },
  //             scaleLabel: {
  //               display: true,
  //             }
  //           }]
  //         }
  //       }
  //     });
  // }
}
export class DVBieuDo {
  FullName: number;
  PointCount: number;
}
