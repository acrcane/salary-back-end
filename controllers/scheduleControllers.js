import HttpError from '../helpers/HttpError.js';
import { createScheduleService } from '../services/scheduleService.js';

export const createSchedule = async (req, res, next) => {
  try {
    const { month, year } = req.body;
    const company = req.user.company
    const schedule = await createScheduleService({
      month,
      year,
      company,
    });
    res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
};

