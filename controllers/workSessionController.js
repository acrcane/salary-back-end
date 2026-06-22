import HttpError from '../helpers/HttpError.js';
import {
  checkInService,
  checkOutService,
  workSessionActiveService,
} from '../services/workSessionService.js';

export const workSessionCheckIn = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { tableId, checkIn } = req.body;
// disactivated after add checkIn/Out Schema
    // if (!tableId || !checkIn) {
    //   throw HttpError(400, 'Missing data');
    // }
    const session = await checkInService(tableId, userId, checkIn);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

export const workSessionCheckOut = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { checkOut } = req.body
// disactivated after add checkIn/Out Schema
    // if(!checkOut) {
    //   throw HttpError(400, 'Missing check out')
    // }

    const session = await checkOutService(sessionId, checkOut)

    res.json(session)

  } catch (error) {
    next(error);
  }
};

export const workSessionActive = async (req, res, next) => {
  try {
    const session = await workSessionActiveService(req.user._id)
    if(!session){
      throw HttpError(404, 'Session not found')
    }
    res.json(session)
  } catch (error) {
    next(error)
  }
}