import HttpError from '../helpers/HttpError.js';
import {
  getAllManagerService,
  getUserLastTable,
} from '../services/managerService.js';

export const getAllUsesTable = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== 'manager') {
      throw HttpError(401, 'No access');
    }

    const tables = await getAllManagerService();

    res.status(200).json(tables);
  } catch (error) {
    next(error);
  }
};

export const getLastTableController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const table = await getUserLastTable(id);
    if (!table) {
      throw HttpError(404, 'not found');
    }
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};
