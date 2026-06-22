import express from 'express';
import { isValidToken } from '../middlewares/isValidToken.js';
import { workSessionActive, workSessionCheckIn, workSessionCheckOut } from '../controllers/workSessionController.js';
import validateBody from '../helpers/validateBody.js';
import { checkInSchema, checkOutSchema } from '../schemas/workSessionSchema.js';

const workSessionRouter = express.Router();

workSessionRouter.post('/check-in/', isValidToken, validateBody(checkInSchema), workSessionCheckIn)
workSessionRouter.patch('/check-out/:sessionId', isValidToken, validateBody(checkOutSchema), workSessionCheckOut)
workSessionRouter.get('/active', isValidToken, workSessionActive)

export default workSessionRouter;
