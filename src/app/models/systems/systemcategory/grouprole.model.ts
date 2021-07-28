export class GroupRole {
    Id: number;
    Name: string;
    IsActive: boolean;
    DepartmentId?: number;
    check: boolean;
}
export interface IGrouprole {
    Id: number;
    Name: string;
    check?: boolean;
}
