import express from 'express';
import { isValidToken } from '../middlewares/isValidToken.js';
import { isManager } from '../middlewares/isManager.js';
import { currentUserController, getAllUsersController } from '../controllers/usersControllers.js';
import { getAllUsesTable, getLastTableController } from '../controllers/managerControllers.js';

const managerRoute = express()

managerRoute.get('/',isValidToken, isManager, currentUserController);
managerRoute.get('/allusers', isValidToken, isManager, getAllUsersController )
managerRoute.get('/tables', isValidToken, isManager, getAllUsesTable)
managerRoute.get('/user-last-table/:id', isValidToken, isManager, getLastTableController)

export default managerRoute