import {
  createTableService,
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
  const { _id } = req.user;
  const userTable = await getTableService(_id);

  res.status(200).json(userTable);
};
