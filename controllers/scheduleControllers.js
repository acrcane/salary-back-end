import { createScheduleService, getActiveScheduleService } from '../services/scheduleService.js';

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

export const getActiveScheduleContriller = async (req, res, next) => {
  try {
    const company = req.user.company
    const schedule = await getActiveScheduleService(company)

    res.status(200).json(schedule)
  } catch (error) {
    next(error)
  }
}

