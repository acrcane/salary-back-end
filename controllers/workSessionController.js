import HttpError from '../helpers/HttpError.js';
import { workSessionService } from '../services/workSessionService.js';

export const workSessionCreate = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { tableId, checkIn, checkOut } = req.body;

    if (!tableId || !checkIn || !checkOut) {
      throw HttpError(400, 'Missing required fields');
    }
    const session = await workSessionService(
      tableId,
      userId,
      checkIn,
      checkOut
    );

    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};
