import HttpError from '../helpers/HttpError.js';
import {
  closeTableService,
  createTableService,
  getAllTablesService,
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

    const user = req.user

    const userTable = await getTableService(user);

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

  } catch (error) {
    next(error);
  }
};

export const getAllTablesController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const userTables = await getAllTablesService(_id);
    res.status(200).json(userTables);
  } catch (error) {
    next(error);
  }
};
