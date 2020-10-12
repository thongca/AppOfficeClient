import { TreeScheduleComponent } from './../../components/tree-schedule/tree-schedule.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ApifileService } from '../../../../shared/apifile.service';
import { CommonService } from '../../../../common/common.service';
import { ApiService } from '../../../../shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TreeDiagramComponent } from '../../../../components/tree-diagram/tree-diagram.component';
import { SelectLenhComponent } from '../../../../components/select-lenh/select-lenh.component';
import { CVQTMyWork, CVQTFlowWork, TreeSchedule } from '../../../../models/giaoviec/congviecmoi.model';
import { WorkdetailService } from '../../../../shared/workdetail.service';


@Component({
  selector: 'app-congviecmoi',
  templateUrl: './congviecmoi.component.html',
  styleUrls: ['./congviecmoi.component.css']
})
export class CongviecmoiComponent implements OnInit {

  constructor(
    ) { }

  ngOnInit(): void {

  }

}
