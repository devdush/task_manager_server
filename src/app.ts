import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { usersRoutes } from "./routes/users.routes";
import fileUpload from "./middlewares/file-handler";
import { tasksRoutes } from "./routes/tasks.routes";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // if you're sending cookies or auth headers
  })
);

app.use(fileUpload);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);

const MONGO_URI = process.env.MONGO_URI || "";
console.log("MONGO_URI:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

export default app;
