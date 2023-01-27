import { DataTypes } from "sequelize";

export enum UserErrors {
    UserIdDoesNotExist,
    UserLoginDoesNotExist,
    UserRemoved,
};

export const sequelizeUserModel = {
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN
    },
};

