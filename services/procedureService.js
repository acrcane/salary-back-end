import { ProcedureSession } from '../db/models/ProcedureSession.js';
import { User } from '../db/models/User.js';
import { WorkSession } from '../db/models/WorkSession.js';
import HttpError from '../helpers/HttpError.js';

export const addProcedureService = async (
  userId,
  workSessionId,
  { procedureName, price, duration }
) => {
  const user = await User.findById(userId);
  if (!user) throw HttpError(404, 'User not found');

  const workSession = await WorkSession.findById(workSessionId);
  if (!workSession) throw HttpError(404, 'Work session not found');
  if (workSession.checkOut) throw HttpError(400, 'Work session already closed');

  const earning = Math.round(price * (user.hygienePercent / 100) * 100) / 100;

  const procedure = {
    owner: userId,
    workSession: workSessionId,
    procedureName,
    price,
    duration,
    earning,
  };

  return procedure;
};

export const getProceduresService = async userId => {
  const procedures = await ProcedureSession.find({ owner: userId })
    .populate('workSession', 'date')
    .select('procedureName duration earning workSession')
    .lean();

  return procedures;
};
