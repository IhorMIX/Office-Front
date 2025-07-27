export interface ILoginData {
  login: string
  password: string
  isNeedToRemember: boolean
}

export interface ICurrentUserModel{
  fullName: string
}

export enum UserType{
  Admin = "Admin",
  HrManager = "HrManager",
  ProjectManager = "ProjectManager",
  Employee = "Employee",
  Role = "Role"
}