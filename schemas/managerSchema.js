import Joi from 'joi';

export const updateUserSchema = Joi.object({
  role: Joi.string().valid('manager'),
  hourlyRate: Joi.number().min(0),
  hygienePercent: Joi.number().min(0).max(100),
}).min(1);