import { Schedule } from '../db/models/Schedule.js';
import HttpError from '../helpers/HttpError.js';

export const addDayService = async ({ scheduleId, date, company }) => {
  const schedule = await Schedule.findById(scheduleId).lean();

  if (!schedule) {
    throw HttpError(404, 'Schedule not found');
  }
  if (schedule.company !== company) {
    throw HttpError(403, 'Access denied');
  }

  const normalizedDate = new Date(date);
  if (isNaN(normalizedDate)) {
    throw HttpError(400, 'Invalid date format');
  }

  const dayExists = schedule.days.some(
    d => new Date(d.date).toISOString() === normalizedDate.toISOString()
  );
  if (dayExists) {
    throw HttpError(409, 'Day already exists in schedule');
  }

  const updated = await Schedule.findByIdAndUpdate(
    scheduleId,
    { $push: { days: { date: normalizedDate, shifts: [] } } },
    { new: true }
  );
  return updated
};
