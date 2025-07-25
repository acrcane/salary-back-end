import Joi from 'joi';

export const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  hourlyRate: Joi.number(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const salarySchema = Joi.object({
  hourlyRate: Joi.number().required(),
});
