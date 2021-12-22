import { Project } from '@/models/Project';
import { User } from '@/models/User';
import mongoose, {
  model,
  PopulatedDoc,
  Schema,
  Document,
  Model,
} from 'mongoose';

export enum LabelsEnum {
  bug = 'bug',
  enhancement = 'enhancement',
  feature = 'feature',
  help_wanted = 'help wanted',
  question = 'question',
}

export const Labels = Object.values(LabelsEnum);

export interface IBoard {
  _id: string;
  title: string;
  description?: string;
  label: LabelsEnum;
  author: PopulatedDoc<User>;
  projectId: PopulatedDoc<Project>;
  createdAt: number;
  updatedAt: number;
}

export interface Board extends Omit<IBoard, '_id'>, Document {}

const BoardSchema = new Schema<Board>(
  {
    title: { type: String, required: true },
    description: String,
    label: { type: String, enum: Labels },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
  },
  { timestamps: true }
);

const BoardModel =
  (mongoose.models?.Board as Model<Board>) ||
  model<Board>('Board', BoardSchema);

export default BoardModel;
