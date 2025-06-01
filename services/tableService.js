import { Table } from '../db/models/Tabel.js';
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

  return table;
};

export const getTableService = async (id, owner) => {
  const table = await Table.findOne({
    _id: id,
    owner,
    status: 'open',
  }).populate('workSession');
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
  table.closedAt = new Date();
  await table.save();
};

export const getAllTAblesService = async owner => {
  const tables = await Table.find({ owner });
  return tables;
};
