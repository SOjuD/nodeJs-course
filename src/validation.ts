
import Joi from 'joi'
import joiValidation from 'express-joi-validation'
import { IBaseUser, IEditUser, IUserId, IUserLogin } from "./index.types";

export const validator = joiValidation.createValidator();

export const createUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/[0-9][a-z]/).required(),
    age: Joi.number().required().min(4).max(130)
})

export interface ICreateUserSchema extends joiValidation.ValidatedRequestSchema {
    [joiValidation.ContainerTypes.Body]: IBaseUser
}

export const editUserSchema = Joi.object({
    login: Joi.string(),
    password: Joi.string().regex(/[0-9][a-z]/),
    age: Joi.number().min(4).max(130),
    id: Joi.string().required()
})

export interface IEditUserSchema extends joiValidation.ValidatedRequestSchema {
    [joiValidation.ContainerTypes.Body]: IEditUser
}

export const getUserScheme = Joi.object({
    id: Joi.string().required()
})

export const getUserByLoginScheme = Joi.object({
    login: Joi.string().required(),
    limit: Joi.number()
})

export interface IGetUserSchema extends joiValidation.ValidatedRequestSchema {
    [joiValidation.ContainerTypes.Query]: IUserId
}

export interface IGetUserByLoginSchema extends joiValidation.ValidatedRequestSchema {
    [joiValidation.ContainerTypes.Query]: IUserLogin
}

