import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { IBaseUser, IEditUser, IUser } from "./user.types";

const users: IUser[] = [];

export const createUser = (userData: IBaseUser): IUser | void => {
    const isUserExist = !!users.find(dbUser => dbUser.login === userData.login);

    if (isUserExist) throw new Error(`user witn login ${userData.login} already exists`);

    const user: IUser = { ...userData } as IUser;
    user.isDeleted = false;
    user.id = uuidv4();

    users.push(user)

    return user;
}

export const editUser = (userData: IEditUser): IEditUser | void => {
    if (!uuidValidate(userData.id)) throw new Error("invalid id format");

    const userIndex = users.findIndex(dbUser => dbUser.id === userData.id);

    if (userIndex < 0) throw new Error(`user witn id ${userData.id} doesn't exist`);


    users[userIndex].login = userData.login;
    users[userIndex].password = userData.password;
    users[userIndex].age = userData.age;

    return users[userIndex];
}

enum UserErrors {
    InvalidIdFormat,
    UserIdDoesNotExist,
    UserLoginDoesNotExist,
    UserRemoved,
}

const throwUserError = (type: UserErrors, param?: string): void => {
    switch (type) {
        case UserErrors.InvalidIdFormat:
            throw new Error("invalid id format");
        case UserErrors.UserIdDoesNotExist:
            throw new Error(`user with id ${param} doesn't exist`);
        case UserErrors.UserRemoved:
            throw new Error(`user with id ${param} exists but removed`);
        case UserErrors.UserLoginDoesNotExist:
            throw new Error(`user with login ${param} doesn't exist`)
    }
}

export const getUserById = (id: string): IUser | void => {
    if (!uuidValidate(id)) throwUserError(UserErrors.InvalidIdFormat);

    const user = users.find(dbUser => dbUser.id === id);

    if (!user) throwUserError(UserErrors.UserIdDoesNotExist, id);
    if (user?.isDeleted) throwUserError(UserErrors.UserRemoved, id);

    return user;
}

export const getUsersByLogin = (loginSubstring: string, limit: number = 10): IUser[] | void => {
    const matches = users.filter(user => user.login.includes(loginSubstring));

    if (!matches.length) throwUserError(UserErrors.UserLoginDoesNotExist, loginSubstring);

    return matches.sort((a, b) => a.login.localeCompare(b.login)).slice(0, limit < matches.length ? matches.length : limit - 1);
}

export const removeUser = (id: string): string | void => {
    if (!uuidValidate(id)) throw new Error("invalid id format");

    const userIndex = users.findIndex(dbUser => dbUser.id === id);

    if (userIndex < 0) throwUserError(UserErrors.UserIdDoesNotExist, id);

    users[userIndex].isDeleted = true;
    return `user ${id} was successfuly removed`;
}