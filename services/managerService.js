import { Table } from '../db/models/Tabel.js';
import { User } from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';

export const getAllManagerService = async () => {
  const tables = await Table.find({ status: 'open' }).populate('owner');
  return tables;
};

export const getUserLastTable = async id => {
  const table = await Table.findOne({ owner: id, status: 'closed' })
    .sort({ _id: -1 })
    .populate('workSession')
    .lean();
  return table;
};

export const updateUserService = async (id, updateData) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw HttpError(404, 'User not found');
  }
};

export const removeUserService = async id => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  return user;
};
