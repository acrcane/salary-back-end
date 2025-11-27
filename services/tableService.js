import { Table } from '../db/models/Tabel.js';
import { User } from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import { currentMonth } from '../helpers/currentMonth.js';

export const createTableService = async userId => {
  const openTabel = await Table.findOne({
    owner: userId,
    status: 'open',
  });

  if (openTabel) {
    throw HttpError(400, 'You already have an open table');
  }

  const table = new Table({ title: currentMonth, owner: userId });

  await table.save();

  return table.toObject();
};

export const getTableService = async (id, user) => {
  const filter = { _id: id, status: 'open' };
  if (user.role === 'manager') {
    const companyUsers = await User.find({ company: user.company }).select(
      '_id'
    );
    const userId = companyUsers.map(user => user._id);
    filter.owner = { $in: userId };
  } else {
    filter.owner = user._id;
  }

  const table = await Table.findOne(filter)
    .populate('owner', 'name email company')
    .populate('workSession')
    .lean();
  return table;
};

export const closeTableService = async (id, owner) => {
  const table = await Table.findOne({ _id: id, owner });
  if (!table) {
    throw HttpError(404, 'Not foun');
  }
  if (table.status === 'close') {
    throw HttpError(400, 'This table is already close');
  }
  table.status = 'close';
  // table._id = null;
  table.closedAt = new Date();
  await table.save();
  return table.toObject()
};

export const getAllTAblesService = async owner => {
  const tables = await Table.find({ owner }).lean();
  return tables;
};
