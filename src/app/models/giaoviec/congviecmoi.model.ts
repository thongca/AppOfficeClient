import { UserLoginFromToken } from '../../common/option';

export class CVQTMyWork {
    constructor() {
        this.Id = null;
        this.Code = 0;
        this.TaskId = null;
        this.TaskName = '';
        this.StartDate = new Date;
        this.PauseTime = 0.0;
        this.WorkTime = 0.0;
        this.EndDate = new Date;
        this.TimeStart = new Date;
        this.TimeEnd = new Date;
        this.TypeTask = 1;
        this.PointTask = 0;
        this.PointTime = 0;
        this.ExpectedDate = new Date;
        this.Repossibility = 1;
    }
Id: string;
Code: number;
TaskId: string;
TaskName: string;
StartDate: Date;
EndDate: Date;
UserTaskId: number;
UserTaskName?: string;
TypeTask: number;
PointTask: number;
PointTime: number;
DeliverType?: number;
StartPause?: Date;
EndPause?: Date;
PauseTime?: number;
WorkTime?: number;
CycleWork?: number;
DepartmentId: number;
Note?: string;
Predecessor?: number;
PreWorkDeadline?: Date;
PreWorkType?: boolean;
CompleteDate?: Date;
TypeComplete?: number;
TimeStart?: Date;
TimeEnd?: Date;
CreatedDate?: Date;
ExpectedDate?: Date;
Repossibility?: number;
Suporter?: any;
DepSuporter?: any;
TotalPoint?: any;
SpaceTimeId?: number;
ReporterName?: string;
}
export class CVQTFlowWork {
    Id: string;
    MyWorkId: string;
    TaskName: string;
    Code: number;
    UserSendId: number;
    SendName: string;
    UserDeliverId: number;
    DeliverName: number;
    SendDate: Date;
    TypeFlow: number;
    CreateDate: Date;
    MaLenh: string;
    ParentId: number;
    Note: string;
    Require?: Date;
    PositionSend?: string;
    PositionDeli?: string;
    DepartSend?: string;
    DepartDeli: string;
    Readed: boolean;
    ReadDate?: Date;
    Handled?: boolean;
    HandleDate?: Date;
    Repossibility?: number;
    CycleWork?: number;
    CompleteDate?: Date;
    Predecessor?: number;
    TypeComplete?: number;
    }
export class TreeSchedule {
    Id: number;
    TaskName: string;
    FullName: string;
    TenLinhVuc: string;
    StartDate: Date;
    EndDate: Date;
    Predecessor: number;
    StatusWork?: number;
    MyWorkId: string;
    children:  TreeSchedule[];
}
export class WorkFlow {
    Id: string;
    MyWorkId: string;
}
