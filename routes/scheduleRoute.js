import express from 'express';
import { isValidToken } from '../middlewares/isValidToken.js';
import { isManager } from '../middlewares/isManager.js';
import validateBody from '../helpers/validateBody.js';
import {  createSchedule } from '../controllers/scheduleControllers.js';
import { scheduleSchema } from '../schemas/scheduleSchema.js'
import { createSheduleDayController } from '../controllers/scheduleDaysController.js';
import { addShiftController } from '../controllers/scheduleShiftsController.js';

const scheduleRoute = express.Router()

scheduleRoute.post('/', validateBody(scheduleSchema),isValidToken, isManager, createSchedule)

scheduleRoute.post('/:scheduleId/days', isValidToken, isManager, createSheduleDayController)

scheduleRoute.post('/:scheduleId/shifts', isValidToken, isManager, addShiftController)

export default scheduleRoute