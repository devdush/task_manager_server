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
}
