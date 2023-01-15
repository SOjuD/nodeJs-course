import { createConnection, defineUsers } from "../data-acess/user.transfer";
import { IBaseUser, UserModelAttributes } from "../interfaces/user.types";

const usersStartPack = [
    { login: "test1", password: 'pass1232', age: 22, isDeleted: false },
    { login: "test2", password: 'pass1231', age: 23, isDeleted: false },
    { login: "test3", password: 'pass1232', age: 24, isDeleted: false },
    { login: "test4", password: 'pass1233', age: 25, isDeleted: false },
    { login: "test5", password: 'pass1234', age: 26, isDeleted: false },
    { login: "test6", password: 'pass1235', age: 27, isDeleted: false },
    { login: "test7", password: 'pass1236', age: 28, isDeleted: false },
    { login: "test8", password: 'pass1237', age: 29, isDeleted: false },
    { login: "test9", password: 'pass1238', age: 10, isDeleted: false },
];

const fillUserTable = (data: IBaseUser[], model: UserModelAttributes): void => {
    data.forEach(dataItem => model.create(dataItem))
}

export const initializeUserTable = async (isNeedUpdateDB: boolean = false) => {

    const connection = createConnection(process.env.DB_URL as string);

    const users = defineUsers(connection);


    try {


        if (isNeedUpdateDB) {
            await users.sync({ force: true });
            await fillUserTable(usersStartPack, users);

            console.log("The table for the User model was just (re)created!");

        }
        return users;

    } catch (error) {
        console.error('Unable to connect to the database');
        throw new Error(error);
    }
}