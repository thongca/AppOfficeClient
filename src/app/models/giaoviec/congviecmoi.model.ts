export class CVQTMyWork {
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
