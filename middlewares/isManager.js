import HttpError from '../helpers/HttpError.js';

export const isManager = async (req, res, next) => {
  try {
    if (!req.user) throw HttpError(401, 'no authorization');
    if (req.user.role !== 'manager') {
      throw HttpError(403, 'Manager only');
    }
    next();
  } catch (error) {
    next(error);
  }
};
