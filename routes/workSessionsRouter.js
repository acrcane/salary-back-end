import express from 'express';
import { isValidToken } from '../middlewares/isValidToken.js';
import { workSessionCheckIn, workSessionCheckOut } from '../controllers/workSessionController.js';

const workSessionRouter = express.Router();

workSessionRouter.post('/check-in/', isValidToken, workSessionCheckIn)
workSessionRouter.patch('/check-out/:sessionId', isValidToken, workSessionCheckOut)

export default workSessionRouter;
