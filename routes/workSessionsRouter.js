import express from 'express';
import { isValidToken } from '../middlewares/isValidToken.js';
import { workSessionCreate } from '../controllers/workSessionController.js';

const workSessionRouter = express.Router();

workSessionRouter.post('/session', isValidToken, workSessionCreate);

export default workSessionRouter;
