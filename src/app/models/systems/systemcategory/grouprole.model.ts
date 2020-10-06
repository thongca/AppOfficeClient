export class GroupRole {
    Id: number;
    Name: string;
    IsActive: boolean;
    IsAdminDep: boolean;
    IsAdminCom: boolean;
    IsAdminNest: boolean;
    IsAdministrator: boolean;
    DepartmentId?: number;
    CompanyId: number;
    check: boolean;
}
export interface IGrouprole {
    Id: number;
    Name: string;
    check?: boolean;
}
