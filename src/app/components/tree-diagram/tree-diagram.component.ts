import { Component, OnInit, Input } from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './customDagreNodesOnly';
@Component({
  selector: 'app-tree-diagram',
  templateUrl: './tree-diagram.component.html',
  styleUrls: ['./tree-diagram.component.css']
})
export class TreeDiagramComponent implements OnInit {
  @Input() employees: Employee[] = [];
  @Input() typeStatus: string;
  colors: Color[] = [];
  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: 'LR',
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();
  workFlows: WorkFlow[] = [];
  constructor() {
    this.colors = [
      {
        color: '#00AEEF'
      }
    ];
  }

  public ngOnInit(): void {
  }
getStart(value) {
  this.nodes = [];
  this.employees = value;
  for (const employee of this.employees) {
    const node: Node = {
      id: employee.Id,
      label: employee.TenNguoiNhan,
      data: {
        office: employee.TrangThaiXuLy,
        time: employee.ThoiGianGui,
        backgroundColor: '#FFFFFF'
      }
    };

    this.nodes.push(node);
  }
  this.links = [];
  for (const employee of this.employees) {
    if (!employee.ParentId) {
      continue;
    }
    const edge: Edge = {
      source: employee.ParentId,
      target: employee.Id,
      label: '',
      data: {
        linkText: 'Manager of'
      }
    };

    this.links.push(edge);
  }
}
getStartWorkFlow(value) {
  this.nodes = [];
  this.workFlows = value;
  for (const workFlow of this.workFlows) {
    const node: Node = {
      id: workFlow.Id,
      label: workFlow.DeliverName,
      data: {
        office: workFlow.TypeFlow,
        time: workFlow.SendDate,
        backgroundColor: '#FFFFFF'
      }
    };

    this.nodes.push(node);
  }
  this.links = [];
  for (const workFlow of this.workFlows) {
    if (!workFlow.ParentId) {
      continue;
    }
    const edge: Edge = {
      source: workFlow.ParentId,
      target: workFlow.Id,
      label: '',
      data: {
        linkText: 'Manager of'
      }
    };

    this.links.push(edge);
  }
}
  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor
    };
  }
}

export class Employee {
  Id: string;
  TenNguoiNhan: string;
  TrangThaiXuLy: number;
  ThoiGianGui: number;
  ParentId?: string;
}
export class WorkFlow {
  Id: string;
  DeliverName: string;
  TypeFlow: number;
  SendDate: Date;
  ParentId?: string;
}
export class Color {
  color: string;
}
