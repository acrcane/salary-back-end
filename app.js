import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import userRouter from './routes/usersRouter.js';
import tableRoute from './routes/tablesRouter.js';
import workSessionRouter from './routes/workSessionsRouter.js';
import managerRoute from './routes/managerRoute.js';

dotenv.config();
const { PORT } = process.env;

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://acrcane.github.io'];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/table', tableRoute);
app.use('/work-session', workSessionRouter);
app.use('/manager', managerRoute);


app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
});
