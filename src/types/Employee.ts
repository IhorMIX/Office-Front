import { Position, Subdivision } from "./Selection";
import { UserType } from "./User";

export interface BaseEmployee{
    id: number;
    fullName: string;
}

export interface Employee extends BaseEmployee {
    subdivision: Subdivision;
    position: Position;
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