import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export const tasksRoutes = Router();

tasksRoutes.post("/", TaskController.createTask);
tasksRoutes.get("/chart-data", TaskController.taskDataForChart);
tasksRoutes.get("/", TaskController.getAllTasks);
tasksRoutes.get("/user-chart-data/:userId", TaskController.taskDataForUserChart);
tasksRoutes.put("/status/:id", TaskController.updateTaskStatus);
tasksRoutes.get("/user/:userId", TaskController.getTasksByUser);
tasksRoutes.get("/:id", TaskController.getTaskById);
tasksRoutes.put("/:id", TaskController.updateTask);
tasksRoutes.delete("/:id", TaskController.deleteTask);
