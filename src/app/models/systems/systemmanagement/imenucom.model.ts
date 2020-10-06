export interface IMenuCom {
    Id: number;
    Name: string;
    MenuRank: number;
    ParentId: number;
    IsActive: boolean;
    children?: IMenuCom[];
}

export interface IMenuComPara {
    Id: number;
    Name: string;
    MenuRank: number;
    ParentId: number;
    IsActive: boolean;
    CompanyId: number;
}

export interface IMenuDepPara {
    Id: number;
    Name: string;
    MenuRank: number;
    ParentId: number;
    IsActive: boolean;
    CompanyId: number;
    DepartmentId: number;
}
export interface IMenuNestPara {
    Id: number;
    Name: string;
    MenuRank: number;
    ParentId: number;
    IsActive: boolean;
    CompanyId: number;
    DepartmentId: number;
    NestId: number;
}




