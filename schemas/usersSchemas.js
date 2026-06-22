import Joi from 'joi';

export const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({tlds: { allow: false }}).required(),
  password: Joi.string().min(6).max(30).required(),
  company: Joi.string().min(3).max(30).required(),
  hourlyRate: Joi.number().min(20).required(),
  hygienePercent: Joi.number().min(0).max(100).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email({tlds: { allow: false }}).required(),
  password: Joi.string().min(6).required(),
});

export const salarySchema = Joi.object({
  hourlyRate: Joi.number().min(0).required(),
});