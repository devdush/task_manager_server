import mongoose from "mongoose";
import TaskModel from "../models/Tasks.model";

export class TasksService {
  static async createTask(
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    status: string,
    assignedTo: string[],
    attachments: string[],
    priority: string,
    createdBy: string
  ) {
    try {
      const newTask = await TaskModel.create({
        title,
        description,
        startDate,
        endDate,
        status,
        assignedTo,
        attachments,
        priority,
        createdBy,
      });
      if (!newTask) {
        return { success: false, message: "Failed to create task" };
      }

      return { success: true, data: newTask };
    } catch (error) {
      console.error("Error creating task:", error);
      return { success: false, message: "Error creating task" };
    }
  }
  static async getTaskById(taskId: string) {
    try {
      const task = await TaskModel.findById(taskId).populate(
        "assignedTo",
        "firstName lastName email"
      );
      if (!task) {
        return { success: false, message: "Task not found" };
      }
      return { success: true, data: task };
    } catch (error) {
      console.error("Error fetching task:", error);
      return { success: false, message: "Error fetching task" };
    }
  }
  static async getAllTasks() {
    try {
      const tasks = await TaskModel.find().populate(
        "assignedTo",
        "firstName lastName email"
      );
      return { success: true, data: tasks };
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return { success: false, message: "Error fetching tasks" };
    }
  }
  static async getTasksByUser(userId: string) {
    try {
      const tasks = await TaskModel.find({ assignedTo: userId }).populate(
        "assignedTo",
        "firstName lastName email"
      );
      return { success: true, data: tasks };
    } catch (error) {
      console.error("Error fetching tasks by user:", error);
      return { success: false, message: "Error fetching tasks by user" };
    }
  }
  static async updateTask(
    taskId: string,
    updates: Partial<{
      title: string;
      description: string;
      startDate: Date;
      endDate: Date;
      status: string;
      assignedTo: string[];
      attachments: string[];
      priority: string;
    }>
  ) {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, {
        new: true,
      });
      if (!updatedTask) {
        return { success: false, message: "Failed to update task" };
      }
      return { success: true, data: updatedTask };
    } catch (error) {
      console.error("Error updating task:", error);
      return { success: false, message: "Error updating task" };
    }
  }
  static async deleteTask(taskId: string) {
    console.log("Deleting task with ID:", taskId);
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return { success: false, message: "Failed to delete task" };
      }
      return { success: true, message: "Task deleted successfully" };
    } catch (error) {
      console.error("Error deleting task:", error);
      return { success: false, message: "Error deleting task" };
    }
  }
  static async taskDataForChart() {
    try {
      const tasks = await TaskModel.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);
      const totalTasks = tasks.reduce((acc, item) => acc + item.count, 0);

      const formattedData = tasks.map((item, index) => {
        const hue = (index * 60) % 360;
        return {
          id: item._id,
          label: item._id,
          value: item.count,
          color: `hsl(${hue}, 70%, 50%)`,
        };
      });

      return { success: true, data: formattedData, totalTasks };
    } catch (error) {
      console.error("Error fetching task data for chart:", error);
      return { success: false, message: "Error fetching task data for chart" };
    }
  }
  static async taskDataForUserChart(userId: string) {
    try {
      const objectId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId

      const tasks = await TaskModel.aggregate([
        {
          $match: {
            assignedTo: objectId,
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      const totalTasks = tasks.reduce((acc, item) => acc + item.count, 0);

      const formattedData = tasks.map((item, index) => {
        const hue = (index * 60) % 360;
        return {
          id: item._id,
          label: item._id,
          value: item.count,
          color: `hsl(${hue}, 70%, 50%)`,
        };
      });

      return { success: true, data: formattedData, totalTasks };
    } catch (error) {
      console.error("Error fetching task data for chart:", error);
      return { success: false, message: "Error fetching task data for chart" };
    }
  }
  static async updateTaskStatus(taskId: string, status: string) {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        taskId,
        { status },
        { new: true }
      );
      if (!updatedTask) {
        return { success: false, message: "Failed to update task status" };
      }
      return { success: true, data: updatedTask };
    } catch (error) {
      console.error("Error updating task status:", error);
      return { success: false, message: "Error updating task status" };
    }
  }
}
