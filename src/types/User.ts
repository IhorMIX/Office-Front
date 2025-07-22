export interface ILoginData {
  login: string;
  password: string;
  isNeedToRemember: boolean;
}

export interface ICurrentUserModel{
  fullName: string,
  userType: UserType
}

export interface ICreateUserModel{
  login:string,
  password:string,
  fullName: string;
}

export enum UserType{
  Admin = "Admin",
  HrManager = "HrManager",
  ProjectManager = "ProjectManager",
  Employee = "Employee"
}