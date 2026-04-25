import { addDayService } from '../services/sheduleDaysService.js';

export const createSheduleDayController = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const { date } = req.body;
    const company = req.user.company;

    
    const schedule = await addDayService({ scheduleId, date, company });

    res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
};
