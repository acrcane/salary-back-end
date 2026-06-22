import Joi from 'joi';

export const checkInSchema = Joi.object({
  tableId: Joi.string().hex().length(24).required(),
  checkIn: Joi.date().iso().required(),
});

export const checkOutSchema = Joi.object({
  checkOut: Joi.date().iso().required(),
});