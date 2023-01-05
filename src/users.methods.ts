import { IBaseUser, IEditUser, IUser } from "./index.types";
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

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

export const getUserById = (id: string): IUser | void => {
    if (!uuidValidate(id)) throw new Error("invalid id format");

    const user = users.find(dbUser => dbUser.id === id);

    if (!user) throw new Error(`user with id ${id} doesn't exist`);
    if (user?.isDeleted) throw new Error(`user with id ${id} exists but removed`);

    return user;
}

export const getUsersByLogin = (loginSubstring: string, limit: number = 10): IUser[] | void => {
    const matches = users.filter(user => user.login.includes(loginSubstring));

    if (!matches.length) throw new Error(`user with login ${loginSubstring} doesn't exist`);

    return matches.sort((a, b) => a.login.localeCompare(b.login)).slice(0, limit < matches.length ? matches.length : limit - 1);
}

export const removeUser = (id: string): string | void => {
    if (!uuidValidate(id)) throw new Error("invalid id format");

    const userIndex = users.findIndex(dbUser => dbUser.id === id);

    if (userIndex < 0) throw new Error(`user with id ${id} doesn't exist`);

    users[userIndex].isDeleted = true;
    return `user ${id} was successfuly removed`;
}