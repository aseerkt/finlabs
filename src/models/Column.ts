import { Project } from '@/models/Project';
import {
  Document,
  Model,
  model,
  models,
  ObjectId,
  PopulatedDoc,
  Schema,
} from 'mongoose';

export interface IColumn {
  _id: string;
  title: string;
  projectId: PopulatedDoc<Project>;
  createdAt: number;
  updatedAt: number;
}

export interface Column extends Omit<IColumn, '_id'>, Document {}

const ColumnSchema = new Schema<Column>(
  {
    title: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  },
  { timestamps: true }
);

const ColumnModel =
  (models?.Column as Model<Column>) || model<Column>('Column', ColumnSchema);

export default ColumnModel;
