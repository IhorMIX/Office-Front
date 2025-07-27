import { UserType } from "./User"

export interface IAuthInformation {
    accessKey : string,
    expiredDate : Date,
    refresh_token : string
    role: UserType
}