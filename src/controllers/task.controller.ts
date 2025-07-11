import { TasksService } from "../services/tasks.service";

import { Request, Response } from "express";
export class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        startDate,
        endDate,
        status = "pending",
        assignedTo = [],
        attachments = [],
        priority = "medium",
        createdBy,
      } = req.body;

      const result = await TasksService.createTask(
        title,
        description,
        new Date(startDate),
        new Date(endDate),
        status,
        assignedTo,
        attachments,
        priority,
        createdBy
      );
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const result = await TasksService.getTaskById(taskId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getAllTasks(req: Request, res: Response) {
    try {
      const result = await TasksService.getAllTasks();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async getTasksByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const result = await TasksService.getTasksByUser(userId);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching tasks by user:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async updateTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const updateData = req.body;

      const result = await TasksService.updateTask(taskId, updateData);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  static async deleteTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const result = await TasksService.deleteTask(taskId);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
