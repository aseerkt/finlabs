import { User } from '@/models/User';
import mongoose, { model, PopulatedDoc, Schema, Document } from 'mongoose';

export enum LabelsEnum {
  bug = 'bug',
  enhancement = 'enhancement',
  feature = 'feature',
  help_wanted = 'help wanted',
  question = 'question',
}

export enum ColumnsEnum {
  todo = 'todo',
  in_progress = 'in progress',
  completed = 'completed',
}

export const Labels = Object.values(LabelsEnum);
export const Columns = Object.values(ColumnsEnum);

export interface Board extends Document {
  title: string;
  description?: string;
  label: LabelsEnum;
  column: ColumnsEnum;
  assignee: PopulatedDoc<User>;
  author: PopulatedDoc<User>;
  createdAt: number;
  updatedAt: number;
}

const BoardSchema = new Schema<Board>(
  {
    title: { type: String, required: true },
    description: String,
    label: { type: String, enum: Labels },
    column: { type: String, enum: Columns, default: ColumnsEnum.todo },
    assignee: { type: 'ObjectId', ref: 'User' },
    author: { type: 'ObjectId', ref: 'User' },
  },
  { timestamps: true }
);

const BoardModel = mongoose.models?.Board || model<Board>('Board', BoardSchema);

export default BoardModel;
