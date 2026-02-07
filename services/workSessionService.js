import dayjs from 'dayjs';
import { Table } from '../db/models/Tabel.js';
import { User } from '../db/models/User.js';
import { WorkSession } from '../db/models/WorkSession.js';
import HttpError from '../helpers/HttpError.js';


export const checkInService = async (
  tableId,
  userId,
  checkInTime,
) => {

  const table = await Table.findById(tableId)
  
  if(!table) throw HttpError(404, 'Table not found')
  if(table.status !== 'open') throw HttpError(400, 'Tabel closed')
  
  const user = await User.findById(userId)

  if(!user) throw HttpError(404, 'User not found')
  
  const session = await WorkSession.create({
    table: tableId,
    owner: userId,
    date: checkInTime,
    checkIn: checkInTime,
  })
  return session
}

export const checkOutService = async (
  sessionId,
  checkOutTime
) => {

  const session = await WorkSession.findById(sessionId)
  if(!session) throw HttpError(404, 'Session not found')

  const user = await User.findById(session.owner)
  const checkInDate = new Date(session.checkIn)
  const checkOutDate = new Date(checkOutTime)
  if(checkOutDate <= checkInDate) {
    throw HttpError(400, 'Invalid time')
  }

  const isWeekEnd = [0, 6].includes(dayjs(session.checkIn).day());

  const durationHours = (checkOutDate - checkInDate) / (1000 * 60 * 60)
  const hourlyRate = isWeekEnd ? 33 : user.hourlyRate
  const salary = Number((durationHours * hourlyRate).toFixed(2))

  session.checkOut = checkOutTime
  session.duration = durationHours
  session.salary = salary

  await session.save()

  return session
}
