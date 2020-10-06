
export class IVbQuyTrinh {
    Id: number;
    Name: string;
    IsOrder?: number;
    check: boolean;
}

export class VbBuocLenh {
    Id: number;
    Name: string;
    IsOrder?: number;
    check: boolean;
    children: VbLenhTuongTac[];
}

export class VbLenhTuongTac {
    Id: number;
    Name: string;
    Code: string;
    check: boolean;
}
export class VbBuoc {
    Id: number;
    Name: string;
}
export class OptionQuyTrinh {
    BuocId: number;
    QuyTrinhId: number;
    LenhTuongTacId: number;
    CompanyId: number;
    BuocLenhTuongTacId?: number;
}
export class VBQTBuocLenhGroupRole {
    BuocId: number;
    QuyTrinhId: number;
    BuocLenhTuongTacId: number;
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




