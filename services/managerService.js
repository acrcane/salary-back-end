import { Table } from '../db/models/Tabel.js';

export const getAllManagerService = async () => {
  const tables = await Table.find({ status: 'open' }).populate('owner');
  return tables;
};

export const getUserLastTable = async id => {
  const table = await Table.findOne({ owner: id, status: 'close' })
    .sort({ _id: -1 })
    .populate('workSession')
    .lean();
  return table;
};
