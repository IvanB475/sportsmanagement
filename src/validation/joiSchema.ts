import * as Joi from 'joi';


export const schema = {
    signUp: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required()
    }),
    login: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required()
    }),

}