import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export const tasksRoutes = Router();

tasksRoutes.post("/", TaskController.createTask);
tasksRoutes.get("/:id", TaskController.getTaskById);
tasksRoutes.get("/", TaskController.getAllTasks);
tasksRoutes.get("/user/:userId", TaskController.getTasksByUser);
tasksRoutes.put("/:id", TaskController.updateTask);
tasksRoutes.delete("/:id", TaskController.deleteTask);
