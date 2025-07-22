import { Position, Subdivision } from "./Selection";

export interface BaseEmployee{
    id: number;
    fullName: string;
    photo: string;
}

export interface Employee extends BaseEmployee {
    subdivision: Subdivision;
    position: Position;
    status: boolean;
    outOfOfficeBalance: number;
    hrManager: BaseManager | null;
}

export interface BaseManager extends BaseEmployee{

}

export interface HrManager extends BaseManager{

}

export interface ProjectManager extends BaseManager{

}