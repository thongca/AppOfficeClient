export class OptionHeader {
    s: string;
    p: number;
    pz: number;
    total: number;
    totalpage: number;
    paxpz: number;
    mathP: number;
    userName: string;
    groupId: number;
    departmentId?: number;
    rankrole?: number;
    nestId?: number;
    checkLength?: number;
}
export class UserLogin {
    Id: number;
    groupId: number;
    departmentId?: number;
    nestId?: number;
    rankrole?: number;
    fullName?: string;
}
export class UserLoginFromToken {
    UserID: number;
    GroupRoleId: number;
    DepartmentId?: number;
    CompanyId?: number;
    FullName?: string;
}
export class OptionUser {
    departmentId?: number;
    nestId?: number;
    s: string;
}

