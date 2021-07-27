export class User {
    constructor() {
        this.Id = 0;
        this.FullName = '';
        this.Code = 0;
        this.IsActive = true;
        this.check = false;
        this.PositionId = 0;
    }
    Id: number;
    Code: number;
    FullName: string;
    Password: string;
    Username: string;
    IsActive: boolean;
    DepartmentId?: number;
    NestId?: number;
    PositionId: number;
    Role: number;
    check: boolean;
}
