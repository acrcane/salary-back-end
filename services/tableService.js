import { Table } from '../db/models/Tabel.js';
import HttpError from '../helpers/HttpError.js';
// import month from '../helpers/month.js';

export const createTableService = async userId => {
  const now = new Date();
  const currentMonth = now.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const existingTable = await Table.findOne({
    owner: userId,
    title: currentMonth,
  });

  if (existingTable) {
    throw HttpError(400, 'table already exist');
  }

  const table = new Table({ title: currentMonth, owner: userId });

  await table.save();

  return table;
};

export const getTableService = async owner => {
  const table = await Table.find({ owner });
  return table;
};
