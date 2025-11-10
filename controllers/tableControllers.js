import HttpError from '../helpers/HttpError.js';
import mongoose from 'mongoose';
import {
  closeTableService,
  createTableService,
  getAllTAblesService,
  getTableService,
} from '../services/tableService.js';

export const createTableController = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const table = await createTableService(userId);
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

export const getTableController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = req.user
    if (!mongoose.isValidObjectId(id)) {
      throw HttpError(404, 'invalid table id');
    }
    const userTable = await getTableService(id, user);

    if(!userTable){
      throw HttpError(404, 'table not found')
    }
    res.status(200).json(userTable);
  } catch (error) {
    next(error);
  }
};

export const closeTableController = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  try {
    const closedTable = await closeTableService(id, userId);
    res.status(200).json({ message: 'Table is close', closedTable });
    // res.status(200).json(closedTable)
  } catch (error) {
    next(error);
  }
};

export const getAllTablesController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const userTables = await getAllTAblesService(_id);
    res.status(200).json(userTables);
  } catch (error) {
    next(error);
  }
};
