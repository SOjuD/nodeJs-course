import { Sequelize } from "sequelize";
import { UserModel } from "../interfaces/user.types";
import { sequelizeUserModel } from "../models/user.model";

export const createConnection = (url: string): Sequelize => {
    return new Sequelize(url);
}

export const defineUsers = (connsection: Sequelize) => {
    return connsection.define('User', sequelizeUserModel, {
        timestamps: false
    });
}




