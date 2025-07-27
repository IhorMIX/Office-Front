export interface IReduxAuthModel {
    isAuth : boolean;
    accessKey : string;
    refreshToken : string;
    role: string
}