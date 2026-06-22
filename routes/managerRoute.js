import express from 'express';
import { isValidToken } from '../middlewares/isValidToken.js';
import { isManager } from '../middlewares/isManager.js';
import { currentUserController, getAllUsersController } from '../controllers/usersControllers.js';
import { getAllUsesTable, getLastTableController, removeUserController, updateUserController } from '../controllers/managerControllers.js';
import validateBody from '../helpers/validateBody.js';
import { updateUserSchema } from '../schemas/managerSchema.js';

const managerRoute = express.Router()

managerRoute.get('/',isValidToken, isManager, currentUserController);
managerRoute.get('/users', isValidToken, isManager, getAllUsersController )
managerRoute.get('/tables', isValidToken, isManager, getAllUsesTable)
managerRoute.get('/users/:id/last-table', isValidToken, isManager, getLastTableController)
managerRoute.patch('/update/:id', isValidToken, isManager, validateBody(updateUserSchema), updateUserController)
managerRoute.delete('/user/:id', isValidToken, isManager, removeUserController)

export default managerRoute