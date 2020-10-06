export interface IMenuPermission {
    MenuId: number;
    IsActive: boolean;
    Name: string;
    AddPer?: boolean;
    ViewPer?: boolean;
    EditPer?: boolean;
    DelPer?: boolean;
    ExportPer?: boolean;
    CompanyId: number;
    GroupRoleId: number;
    DepartmentId: number;
    NestId: number;
}
