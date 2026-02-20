import express from 'express';
import {
  closeTableController,
  createTableController,
  getAllTablesController,
  getTableController,
} from '../controllers/tableControllers.js';
import { isValidToken } from '../middlewares/isValidToken.js';

const tableRoute = express.Router();

tableRoute.post('/create', isValidToken, createTableController);
tableRoute.get('/alltables', isValidToken, getAllTablesController)
tableRoute.get('/active-table', isValidToken, getTableController);
tableRoute.patch('/close/:id', isValidToken, closeTableController)

export default tableRoute;
