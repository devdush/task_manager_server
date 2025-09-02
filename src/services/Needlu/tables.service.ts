import { Table } from "../../models/Needlu/Tables.model";

export class TableService {
  static async createTable(status: string) {
    try {
      const newTable = await Table.create({ status });
      if (!newTable) {
        return { success: false, message: "Failed to create table" };
      }
      return { success: true, data: newTable };
    } catch (error) {
      console.error("Error creating table:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async getAllTables() {
    try {
      const tables = await Table.find().sort({ createdAt: -1 });
      return { success: true, data: tables };
    } catch (error) {
      console.error("Error fetching tables:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async getTableById(id: string) {
    try {
      const table = await Table.findById(id);
      if (!table) {
        return { success: false, message: "Table not found" };
      }
      return { success: true, data: table };
    } catch (error) {
      console.error("Error fetching table:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async updateTableStatus(id: string, status: string, occupiedAt: Date) {
    try {
      const updatedTable = await Table.findByIdAndUpdate(
        id,
        { status, occupiedAt },
        { new: true }
      );
      if (!updatedTable) {
        return {
          success: false,
          message: "Table not found or failed to update",
        };
      }
      return { success: true, data: updatedTable };
    } catch (error) {
      console.error("Error updating table:", error);
      return { success: false, message: "Internal server error" };
    }
  }

  static async deleteTable(id: string) {
    try {
      const deletedTable = await Table.findByIdAndDelete(id);
      if (!deletedTable) {
        return {
          success: false,
          message: "Table not found or failed to delete",
        };
      }
      return { success: true, data: deletedTable };
    } catch (error) {
      console.error("Error deleting table:", error);
      return { success: false, message: "Internal server error" };
    }
  }
}
