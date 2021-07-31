export class CongViecThuongXuyen {
    constructor() {
        this.Id = '';
        this.Code = '';
        this.Name = '';
        this.GroupTaskId = 0;
        this.CreateDate = new Date;
        this.LevelTask = 0;
        this.LevelTime = 0;
        this.PointTime = 0;
        this.PointTask = 0;
    }
Id: string;
Code: string;
Name: string;
GroupTaskId: number;
Frequency?: number;
CreateDate: Date;
LevelTask: number;
LevelTaskId: number;
LevelTimeId: number;
LevelTime: number;
LevelTaskText?: String;
LevelTimeText?: String;
PointTime: number;
PointTask: number;
DepartmentId?: number;
check?: boolean;
}
