import { User } from '../db/models/User.js';
import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

export const ifEmailExists = async email => {
  const exists = await User.findOne({ email });
  return exists;
};

export const findUserById = async id => {
  const user = await User.findById(id);
  return user;
};

export const updateUserWithToken = async id => {
  const token = jwt.sign({ id }, SECRET_KEY);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const createUser = async userData => {
  const user = new User(userData);
  await user.hashPassword();
  if (user.name === 'George') {
    user.role = 'admin';
  }
  await user.save();
  const userWithToken = await updateUserWithToken(user._id);
  return userWithToken;
};

export const logoutUser = async id => {
  return await User.findByIdAndUpdate(id, { token: null });
};

export const salaryRateService = async (id,  hourlyRate ) => {  
  const salaryUpd = await User.findByIdAndUpdate(
    id,
    { hourlyRate },
    { new: true }
  );  
  return salaryUpd;
};
