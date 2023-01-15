import { Router } from 'express';
import { Op } from 'sequelize';
import { userRouter } from '../controllers/user.routes';
import { IBaseUser, IUser, UserModelAttributes } from "../interfaces/user.types";
import { UserErrors } from '../models/user.model';
import { initializeUserTable } from '../services/user.initialize';

const users: IUser[] = [];

const throwUserError = (type: UserErrors, param?: unknown): void => {
    switch (type) {
        case UserErrors.UserIdDoesNotExist:
            throw new Error(`user with id ${param} doesn't exist`);
        case UserErrors.UserRemoved:
            throw new Error(`user with id ${param} exists but removed`);
        case UserErrors.UserLoginDoesNotExist:
            throw new Error(`user with login ${param} doesn't exist`)
    }
}

export const createUser = async (userData: IBaseUser, users: UserModelAttributes): Promise<IUser | void> => {
    const isUserExist = !!users.findOne({
        where: {
            login: userData.login
        }
    })

    if (isUserExist) throw new Error(`user witn login ${userData.login} already exists`);

    const newUser = users.build({ ...userData, isDeleted: false });

    await newUser.save();

    return newUser.toJSON();
}

export const editUser = async (userData: IUser, users: UserModelAttributes): Promise<IUser | void> => {
    const changedCount = await users.update({ ...userData }, {
        where: {
            id: userData.id
        }
    })

    if (changedCount[0] === 0) throw new Error(`user witn id ${userData.id} doesn't exist`);

    return (await users.findOne({
        where: {
            id: userData.id
        }
    }))?.toJSON();
}

export const getUserById = async (id: number, users: UserModelAttributes): Promise<IUser | void> => {
    const user = (await users.findOne({
        where: {
            id: id
        }
    }))?.toJSON();

    if (!user) throwUserError(UserErrors.UserIdDoesNotExist, id);
    if (user?.isDeleted) throwUserError(UserErrors.UserRemoved, id);

    return user;
}

export const getUsersByLogin = async (loginSubstring: string, limit: number = 10, users: UserModelAttributes): Promise<IUser[] | void> => {
    const matches = await users.findAll({
        where: {
            login: {
                [Op.substring]: loginSubstring
            }
        },
        raw: true,
        limit: limit
    }) as unknown as IUser[];

    if (!matches.length) throwUserError(UserErrors.UserLoginDoesNotExist, loginSubstring);

    return matches.sort((a, b) => a.login.localeCompare(b.login, undefined, { numeric: true, sensitivity: 'base' })).slice(0, limit < matches.length ? matches.length : limit - 1);
}

export const removeUser = async (id: number, users: UserModelAttributes): Promise<string | void> => {
    const changedCount = await users.update({ isDeleted: true }, {
        where: {
            id: id
        }
    })

    if (changedCount[0] === 0) throwUserError(UserErrors.UserIdDoesNotExist, id);

    return `user ${id} was successfuly removed`;
}

export const startApp = (router: Router) => {
    initializeUserTable().then(users => {

        userRouter(router, users as UserModelAttributes);
    }).catch(console.error)

}