import { Selection } from "./Selection";
import { UserType } from "./User";

export interface BaseEmployee{
    id: number;
    fullName: string;
}

export interface Employee extends BaseEmployee {
    subdivision: Selection;
    position: Selection;
    status: boolean;
    outOfOfficeBalance: number;
    hrManager: BaseManager | null;
}

export interface BaseManager extends BaseEmployee{
    role:UserType
}

export interface HrManager extends BaseManager{

}

export interface ProjectManager extends BaseManager{

}

export interface CreateEmployee{
    login:string
    password:string
    fullName: string
    subdivisionId: number
    positionId: number
    status: boolean
    outOfOfficeBalance: number
}

export interface UpdateEmployee{
    id: number
    login:string
    password:string
    fullName: string
    subdivisionId: number
    positionId: number
    status: boolean
    outOfOfficeBalance: number
    hrManagerId:number
}

export interface CreateManager{
    login:string
    password:string
    fullName: string
}

export interface UpdateManager extends CreateManager{
    id:number
}