import {
  addProcedureService,
  getProceduresService,
} from '../services/procedureService.js';

export const addProcedureController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { sessionId } = req.params;
    const { procedureName, price, duration } = req.body;

    const procedure = await addProcedureService(userId, sessionId, {
      procedureName,
      price,
      duration,
    });

    res.status(201).json(procedure);
  } catch (error) {
    next(error);
  }
};

export const getProceduresController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const procedure = await getProceduresService(userId);
    
    res.status(200).json(procedure);
  } catch (error) {
    next(error);
  }
};
