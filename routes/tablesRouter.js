import express from 'express';
import {
  createTableController,
  getTableController,
} from '../controllers/tableControllers.js';
import { isValidToken } from '../middlewares/isValidToken.js';

const tableRoute = express.Router();

tableRoute.post('/create', isValidToken, createTableController);
tableRoute.get('/month-table', isValidToken, getTableController);

export default tableRoute;
