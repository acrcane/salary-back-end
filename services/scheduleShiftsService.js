import { Schedule } from '../db/models/Schedule.js';
import HttpError from '../helpers/HttpError.js';

export const addShiftService = async ({ scheduleId, date, shift }) => {
  const schedule = await Schedule.findById(scheduleId);
  
  if (!schedule) {
    throw HttpError(404, 'Schedule not found');
  }

  if (schedule.status === 'archived') {
    throw HttpError(400, 'Archived schedule is not editable');
  }

  const day = schedule.days.find(
    d => new Date(d.date).toDateString() === new Date(date).toDateString()
  );
  if (!day) {
    throw HttpError(404, 'Day not found');
  }
  
  const { doctor, assistant, startShift, endShift } = shift;
  const conflict = day.shifts.some(
    s =>
      (s.doctor === doctor ||
        s.assistant === assistant) &&
      s.startShift < endShift &&
      s.endShift > startShift
  );
  if (conflict) {
    throw HttpError(409, 'Doctor or assistant is busy at this time');
  }

  const updated = await Schedule.findOneAndUpdate(
    { _id: scheduleId, 'days.date': date },
    { $push: { 'days.$.shifts': shift } },
    { new: true }
  );
  return updated
};
