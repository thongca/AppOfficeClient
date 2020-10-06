export interface SysDmCompany {
    Id: number;
    Name: number;
    IsActive: boolean;
    CreateDate: number;
    check: boolean;
}

export interface MoHinhToChuc {
    Id: number;
    Name: number;
    Loai: number;
    children?: MoHinhToChuc[];
}

export interface Department {
    Id: number;
    Name: number;
}

