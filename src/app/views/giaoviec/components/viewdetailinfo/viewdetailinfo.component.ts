import { Component, Input, OnInit } from '@angular/core';
import { CVQTMyWork } from '../../../../models/giaoviec/congviecmoi.model';
import { WorkdetailService } from '../../../../shared/workdetail.service';

@Component({
  selector: 'app-viewdetailinfo',
  templateUrl: './viewdetailinfo.component.html',
  styleUrls: ['./viewdetailinfo.component.css']
})
export class ViewdetailinfoComponent implements OnInit {
  modelView: CVQTMyWork = new CVQTMyWork();
  constructor(
    private _workFlowDetail: WorkdetailService,
  ) { }

  ngOnInit(): void {
    this._workFlowDetail.infoWorkFlow$.subscribe(data => {
      this.modelView = data;
    });
  }

}
