import { Router } from 'express';
import { ValidatedRequest } from "express-joi-validation";
import { createUser, editUser, getUserById, getUsersByLogin, removeUser } from "./user.methods";
import { ICreateUserSchema, IEditUserSchema, IGetUserSchema, createUserSchema, editUserSchema, getUserScheme, validator } from "./user.validation";

const userPath = '/user/:id?:login?';

export const userRouter = (router: Router): void => {
    router.route(userPath)
        .post(validator.body(createUserSchema), (req: ValidatedRequest<ICreateUserSchema>, res) => {
            try {
                const user = createUser(req.body);

                res.json(user)
            } catch (e) {
                res.end(e.message)
            }
        })
        .get(validator.query(getUserScheme), (req: ValidatedRequest<IGetUserSchema>, res) => {
            try {
                let user;

                if (req.query.id) user = getUserById(req.query.id);
                else user = getUsersByLogin(req.query.login, req.query.limit);

                res.json(user)
            } catch (e) {
                res.end(e.message)
            }
        })
        .put(validator.body(editUserSchema), (req: ValidatedRequest<IEditUserSchema>, res) => {
            try {
                const user = editUser(req.body)

                res.json(user)
            } catch (e) {
                res.end(e.message)
            }
        })
        .delete(validator.query(getUserScheme), (req: ValidatedRequest<IGetUserSchema>, res) => {
            try {
                res.end(removeUser(req.query.id))
            } catch (e) {
                res.end(e.message)
            }
        })

}