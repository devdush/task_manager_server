import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { usersRoutes } from "./routes/users.routes";
import fileUpload from "./middlewares/file-handler";
import { tasksRoutes } from "./routes/tasks.routes";
import { categoriesRoutes } from "./routes/Needlu/categories.routes";
import { productsRoutes } from "./routes/Needlu/products.routes";
import { cashiersRoutes } from "./routes/Needlu/cashier.routes";
import { bakeryOrders } from "./routes/Needlu/bakeryOrders.routes";
import { loginRoutes } from "./routes/Needlu/login.routes";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(fileUpload);
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/pos-categories", categoriesRoutes);
app.use("/api/pos-products", productsRoutes);
app.use("/api/pos-cashiers", cashiersRoutes);
app.use("/api/pos-bakery-orders", bakeryOrders);
app.use("/api/pos-login", loginRoutes);

const MONGO_URI = process.env.MONGO_URI || "";
console.log("MONGO_URI:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

export default app;
