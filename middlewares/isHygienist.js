export const isHygienist = (req, res, next) => {
  if (!req.user || !req.user.role) {
    throw HttpError(401, 'no authorization');
  }
  if (req.user.role !== 'hygienist') {
    throw HttpError(403, 'Hygienist only');
  }
  next();
};
