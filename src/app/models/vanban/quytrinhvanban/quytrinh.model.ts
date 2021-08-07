
export class IVbQuyTrinh {
    Id: string;
    Name: string;
    IsOrder?: number;
    check: boolean;
}

export class VbBuocLenh {
    Id: string;
    Name: string;
    IsOrder?: number;
    check: boolean;
    children: VbLenhTuongTac[];
}

export class VbLenhTuongTac {
    Id: string;
    Name: string;
    Code: string;
    check: boolean;
}
export class VbBuoc {
    Id: string;
    Name: string;
}
export class OptionQuyTrinh {
    BuocId: string;
    QuyTrinhId: string;
    LenhTuongTacId: string;
    BuocLenhTuongTacId?: string;
}
export class VBQTBuocLenhGroupRole {
    BuocId: string;
    QuyTrinhId: string;
    BuocLenhTuongTacId: string;
    CompanyId: number;
    GroupRoleId: number;
    Name: string;
    IsAll: boolean;
    IsDepartment: boolean;
    IsNest: boolean;
    IsAllComCon: boolean;
    IsAllComCha: boolean;
    IsNguoiLap: boolean;
    IsNguoiGui: boolean;
    IsManagement: boolean;
}

export class OptionLenhSelect {
    MenuId: string;
    GroupRoleId: number;
    MyWorkId?: string;
}
export class BuocLenhGroupSelect {
    Name: string;
    Code: string;
    BuocLenhGroupId: number;
}
export class LinhVuc {
    Name: string;
    Id: number;
}




