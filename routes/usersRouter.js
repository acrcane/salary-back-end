import express from 'express';
import validateBody from '../helpers/validateBody.js';
import {
  signupController,
  signinController,
  currentUserController,
  signout,
  salaryPerHourController,
} from '../controllers/usersControllers.js';
import { isValidToken } from '../middlewares/isValidToken.js';
import { loginSchema, signupSchema, salarySchema } from '../schemas/usersSchemas.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const userRouter = express.Router();

userRouter.post('/signup', validateBody(signupSchema), signupController);
userRouter.post('/signin', validateBody(loginSchema), signinController);
userRouter.get('/current', isValidToken, currentUserController);
userRouter.post('/signout', isValidToken, signout);
userRouter.get('/admin', isValidToken, isAdmin, currentUserController);
userRouter.patch('/salaryupd', isValidToken, salaryPerHourController)

export default userRouter;
