export class OptionHeader {
    s: string;
    p: number;
    pz: number;
    total: number;
    totalpage: number;
    paxpz: number;
    mathP: number;
    userName: string;
    companyId: number;
    groupId: number;
    departmentId?: number;
    rankrole?: number;
    nestId?: number;
}
export class UserLogin {
    Id: number;
    companyId: number;
    groupId: number;
    departmentId?: number;
    nestId?: number;
    rankrole?: number;
    fullName?: string;
}
export class OptionUser {
    companyId: number;
    departmentId?: number;
    nestId?: number;
    s: string;
}

