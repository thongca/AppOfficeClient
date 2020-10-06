export class ChuyenXuLyModel {
    Id?: string;
    NguoiGuiId: number;
    NameNguoiGui: string;
    NguoiNhanId?: number;
    TenNguoiNhan?: string;
    NguoiChiDaoId?: number;
    TenNguoiChiDao?: string;
    NguoiKyId?: number;
    TenNguoiKy?: string;
    NguoiXuLyId?: number;
    TenNguoiXuLy?: string;
    NguoiDXuLyId?: number;
    TenNguoiDXuLy?: string;
    NguoiNDBId?: number;
    TenNguoiNDB?: string;
    NoiDung?: number;
    UuTien?: boolean;
    Time?: Date;
    HanXuLy?: Date;
    MenuGuiId?: string;
    MenuNhanId?: string;
    ParentId?: string;
    VbMoiSoHoaId?: string;
    MaLenh?: string;
    TieuDe?: string;
    TrangThaiXuLy?: number;
}

export class UserNhan {
    NguoiChiDaoId?: number;
    TenNguoiChiDao?: string;
    NguoiXuLyId?: number;
    TenNguoiXuLy?: string;
    NguoiDXuLyId?: number;
    TenNguoiDXuLy?: string;
    NguoiNDBId?: number;
    TenNguoiNDB?: string;
}
export class UserXNHT {
    isNguoiLap?: boolean;
    isNguoiGui?: boolean;
}
