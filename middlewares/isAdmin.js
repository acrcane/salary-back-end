import HttpError from '../helpers/HttpError.js';

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) throw HttpError(401, 'no authorization');
    if (req.user.role !== 'admin') {
      throw HttpError(403, 'Admin only');
    }
    next();
  } catch (error) {
    next(error);
  }
};
