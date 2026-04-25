import { addShiftService } from "../services/scheduleShiftsService.js";

export const addShiftController = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const { date, shift } = req.body;

    const schedule = await addShiftService({scheduleId, date, shift})

    res.status(201).json(schedule)
  } catch (error) {
    next(error);
  }
};
