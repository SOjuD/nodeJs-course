import { Router } from 'express';
import { ValidatedRequest } from "express-joi-validation";
import { UserModelAttributes } from '../services/types/user.types';
import { createUser, editUser, getUserById, getUsersByLogin, removeUser } from "../services/user.services";
import { ICreateUserSchema, IGetUserSchema, IUserSchema, createUserSchema, editUserSchema, getUserScheme, validator } from "../services/user.validation";

const userPath = '/user/:id?:login?';

export const userRouter = (router: Router, users: UserModelAttributes): void => {
	router.route(userPath)
		.post(validator.body(createUserSchema), async (req: ValidatedRequest<ICreateUserSchema>, res) => {
			try {
				const user = await createUser(req.body, users);

				res.json(user)
			} catch (e) {
				res.end(e.message)
			}
		})
		.get(validator.query(getUserScheme), async (req: ValidatedRequest<IGetUserSchema>, res) => {
			try {
				let user;
				const id = req.query.id;

				if (id) user = await getUserById(id, users);
				else user = await getUsersByLogin(req.query.login, req.query.limit, users);

				res.json(user)
			} catch (e) {
				res.end(e.message)
			}
		})
		.put(validator.body(editUserSchema), async (req: ValidatedRequest<IUserSchema>, res) => {
			try {
				const user = await editUser(req.body, users)

				res.json(user)
			} catch (e) {
				res.end(e.message)
			}
		})
		.delete(validator.query(getUserScheme), async (req: ValidatedRequest<IGetUserSchema>, res) => {
			try {
				res.end(await removeUser(req.query.id, users))
			} catch (e) {
				res.end(e.message)
			}
		})

}