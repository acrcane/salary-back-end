import express from 'express';
import { isValidToken } from '../middlewares/isValidToken.js';
import { isHygienist } from '../middlewares/isHygienist.js';
import { addProcedureController, getProceduresController } from '../controllers/procedureController.js';

const procedureRoute = express.Router()

procedureRoute.post('/session/:sessionId', isValidToken, isHygienist, addProcedureController)
procedureRoute.get('/', isValidToken, isHygienist, getProceduresController)

export default procedureRoute