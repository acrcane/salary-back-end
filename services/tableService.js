import { Table } from '../db/models/Tabel.js';
import { User } from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import { currentMonth } from '../helpers/currentMonth.js';

export const createTableService = async (userId) => {
  const openTabel = await Table.findOne({
    owner: userId,
    status: 'open',
  }).lean();

  if (openTabel) {
    throw HttpError(400, 'You already have an open table');
  }

  const table = new Table({ title: currentMonth, owner: userId });

  await table.save();

  return table.toObject();
};

export const getTableService = async (user) => {
  const filter = { status: 'open' };
  if (user.role === 'manager') {
    const companyUsers = await User.find({ company: user.company }).select(
      '_id'
    );
    const userIds = companyUsers.map(user => user._id);
    filter.owner = { $in: userIds };
  } else {
    filter.owner = user._id;
  }

  const table = await Table.findOne(filter)
    .populate('owner', 'name email company hourlyRate')
    .populate('workSession')
    .lean();
    if (!table) return null 

    const totalHours = table.workSession.reduce((acc, s) => acc + (s.duration || 0), 0)
    const totalSalary = Number(totalHours * table.owner.hourlyRate).toFixed(2)
  return {
    ...table,
    totalHours: Number(totalHours.toFixed(2)),
    totalSalary
  };
};

export const closeTableService = async (id, owner) => {
  const table = await Table.findOne({ _id: id, owner });
  if (!table) {
    throw HttpError(404, 'Not foun');
  }
  if (table.status === 'closed') {
    throw HttpError(400, 'This table is already close');
  }
  table.status = 'closed';

  table.closedAt = new Date();
  await table.save();
  return table.toObject()
};

export const getAllTablesService = async (owner) => {
  const tables = await Table.find({ owner }).lean();
  return tables;
};
