
import joiValidation from 'express-joi-validation';
import Joi from 'joi';
import { IBaseUser, IGetUser, IUser } from './types/user.types';

export const validator = joiValidation.createValidator();

export const createUserSchema = Joi.object({
	login: Joi.string().required(),
	password: Joi.string().regex(/[0-9][a-z]/).required(),
	age: Joi.number().required().min(4).max(130)
})

export const editUserSchema = Joi.object({
	login: Joi.string(),
	password: Joi.string().regex(/[0-9][a-z]/),
	age: Joi.number().min(4).max(130),
	id: Joi.number().required()
})

export const getUserScheme = Joi.object({
	id: Joi.number(),
	login: Joi.string(),
	limit: Joi.number()
})


export interface ICreateUserSchema extends joiValidation.ValidatedRequestSchema {
	[joiValidation.ContainerTypes.Body]: IBaseUser
}

export interface IUserSchema extends joiValidation.ValidatedRequestSchema {
	[joiValidation.ContainerTypes.Body]: IUser
}

export interface IGetUserSchema extends joiValidation.ValidatedRequestSchema {
	[joiValidation.ContainerTypes.Query]: IGetUser
}


