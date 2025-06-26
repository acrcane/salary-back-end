import dayjs from 'dayjs';
import { Table } from '../db/models/Tabel.js';
import { User } from '../db/models/User.js';
import { WorkSession } from '../db/models/WorkSession.js';
import HttpError from '../helpers/HttpError.js';




export const workSessionService = async (
  tableId,
  userId,
  checkInTime,
  checkOutTime
) => {
  const table = await Table.findById(tableId);
  if (!table) {
    throw HttpError(404, 'Table not found');
  }
  if (table.status !== 'open') {
    throw HttpError(400, 'Table is closed');
  }
  if (checkOutTime <= checkInTime) {
    throw HttpError(400, 'Invalid work session');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  const checkInDate = new Date(checkInTime);
  const checkOutDate = new Date(checkOutTime);
  const isWeekEnd = [0, 6].includes(dayjs(checkInTime).day())
  const durationMs = checkOutDate - checkInDate;
  const durationHours = durationMs / (1000 * 60 * 60);
  const hourlyRate = isWeekEnd ? 27 : user.hourlyRate;
  const salary = durationHours * hourlyRate;

  const session = new WorkSession({
    table: table._id,
    owner: user._id,
    date: checkInTime,
    checkIn: checkInTime,
    checkOut: checkOutTime,
    duration: durationHours,
    salary: parseFloat(salary).toFixed(2),
  });
  await session.save();

  return session;
};
