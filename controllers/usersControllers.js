import HttpError from '../helpers/HttpError.js';
import {
  createUser,
  ifEmailExists,
  logoutUser,
  updateUserWithToken,
  salaryRateService,
  getAllUsers,
} from '../services/userServices.js';

export const signupController = async (req, res, next) => {
  const { name, email, company, hourlyRate } = req.body;
  try {
    const exists = await ifEmailExists(email);
    if (exists) {
      throw HttpError(409, 'this email already exists');
    }
    const user = await createUser(req.body);
    res.status(201).json({
      token: user.token,
      user: {
        name,
        email,
        company,
        hourlyRate
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

    const isValidPass = await user.comparePassword(password);
    if (!isValidPass) {
      throw HttpError(401, 'Wrong email or password');
    }

    const authUser = await updateUserWithToken(user._id);

    res.status(200).json({
      user: {
        email,
        name: user.name,
        role: user.role,
      },
      token: authUser.token,
    });
  } catch (error) {
    next(error);
  }
};

export const currentUserController = async (req, res) => {
  const { name, email, role, hourlyRate } = req.user;
  if(!req.user){
    return res.status(401).json({ error: 'we are here' });
  }
  res.status(200).json({ name, email, role, hourlyRate });
};

export const signout = async (req, res) => {
  const { _id } = req.user;
  await logoutUser(_id);
  res.sendStatus(204);
};

export const salaryPerHourController = async (req, res, next) => {
  const { _id } = req.user;
  const { hourlyRate } = req.body;
  try {
    await salaryRateService(_id, hourlyRate);
    res.status(200).json({hourlyRate});
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const companyManager = req.user.company
    if(!companyManager) {
      throw HttpError(403, 'Wrong company')
    }
    const users = await getAllUsers(companyManager)
    console.log(users);
    
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}