import Joi from "joi";

export interface IBaseUser {
    login: string;
    password: string;
    age: number;
}

export interface IUser extends IBaseUser {
    id: string;
    isDeleted: boolean;
}

export interface IEditUser extends IBaseUser {
    id: string;
}

export interface IGetUser {
    id: string;
    login: string;
    limit: number;
}