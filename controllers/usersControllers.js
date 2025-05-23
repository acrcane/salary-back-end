import HttpError from '../helpers/HttpError.js';
import {
  createUser,
  ifEmailExists,
  logoutUser,
  updateUserWithToken,
} from '../services/userServices.js';

export const signupController = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const exists = await ifEmailExists(email);
    if (exists) {
      throw HttpError(409, 'this email already exists');
    }
    const user = await createUser(req.body);
    res.status(201).json({
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signinController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await ifEmailExists(email);
    if (!user) {
      throw HttpError(401, 'Wrong email or password');
    }

    const isValidPass = user.comparePassword(password);
    if (!isValidPass) {
      throw HttpError(401, 'Wrong email or password');
    }

    const authUser = await updateUserWithToken(user._id);

    res.status(200).json({
      user: {
        email,
        name: user.name,
        role: user.role,
        hourlyRate: user.hourlyRate,
      },
      token: authUser.token,
    });
  } catch (error) {
    next(error);
  }
};

export const currentUserController = async (req, res) => {
  const { email, name } = req.user;

  res.status(200).json({
    email,
    name,
  });
};

export const signout = async (req, res) => {
  const { _id } = req.user;
  await logoutUser(_id);
  res.sendStatus(204);
};
