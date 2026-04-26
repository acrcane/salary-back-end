import HttpError from '../helpers/HttpError.js';

export const isManager = (req, _, next) => {
  if (!req.user || !req.user.role) {
    throw HttpError(401, 'no authorization');
  }
  if (req.user.role !== 'manager') {
    throw HttpError(403, 'Manager only');
  }
  next();
};
