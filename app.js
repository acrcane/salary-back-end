import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import userRouter from "./routes/usersRouter.js";
import tableRoute from "./routes/tablesRouter.js";
import workSessionRouter from "./routes/workSessionsRouter.js";
import managerRoute from "./routes/managerRoute.js";

dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", userRouter);
app.use("/table", tableRoute)
app.use('/work-session', workSessionRouter)
app.use('/manager', managerRoute)

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.message)
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
});
