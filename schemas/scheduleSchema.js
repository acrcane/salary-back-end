import Joi from 'joi';


const shiftSchema = Joi.object({
  doctor: Joi.string().min(2).max(50).required(),
  assistant: Joi.string().min(2).max(50).required(),
  startShift: Joi.string().required(),
  endShift: Joi.string().required(),
});

const daySchema = Joi.object({
  date: Joi.date().required(),
  shifts: Joi.array().items(shiftSchema).default([]),
});

export const scheduleSchema = Joi.object({
  month: Joi.string()
    .valid(
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    )
    .required(),

  year: Joi.number().integer().min(2020).max(2100).required(),

  days: Joi.array().items(daySchema).default([]),

  status: Joi.string().valid('draft', 'active', 'archived').default('draft'),
}).unknown(false);
