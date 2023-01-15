import { Model, ModelCtor } from "sequelize";

export interface IBaseUser {
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface IUser extends IBaseUser {
    id: number;

}

export interface IGetUser {
    id: number;
    login: string;
    limit: number;
}

export type UserModel = Model<IUser, IBaseUser>;

export type UserModelAttributes = ModelCtor<Model<IUser, IBaseUser>>;