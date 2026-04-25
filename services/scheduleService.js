import { Schedule } from '../db/models/Schedule.js';
import HttpError from '../helpers/HttpError.js';

export const createScheduleService = async data => {
  const { month, year, company } = data;
  const existing = await Schedule.findOne({ month, year, company }).lean();
  if (existing) {
    throw HttpError(409, 'Schedule already exists for this period');
  }
  const schedule = await Schedule.create({ ...data });
  return schedule;
};
