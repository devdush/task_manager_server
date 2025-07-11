import { Schema, model, Document, Types } from "mongoose";
interface Tasks extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  assignedTo: Types.ObjectId[];
  attachments: string[];
  priority: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
const TasksSchema = new Schema<Tasks>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, default: "pending" },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: "TaskUsers" }],
    attachments: [{ type: String }],
    priority: { type: String, default: "normal" },
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
TasksSchema.virtual('usersInfo',{
    ref: 'TaskUsers',
    localField: 'assignedTo',
    foreignField: '_id',
    justOne: false
})
export const TaskModel = model<Tasks>("Tasks", TasksSchema);

export default TaskModel;
