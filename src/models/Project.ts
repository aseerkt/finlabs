import {
  Document,
  Model,
  model,
  models,
  ObjectId,
  PopulatedDoc,
  Schema,
} from 'mongoose';
import { User } from './User';

export interface IProject {
  _id: string;
  name: string;
  description?: string;
  sourceCode?: string;
  website?: string;
  creator: PopulatedDoc<User>;
  createdAt: number;
  updatedAt: number;
}

export interface Project extends Document, Omit<IProject, '_id'> {}

const ProjectSchema = new Schema<Project>(
  {
    name: { type: String, required: true },
    description: String,
    sourceCode: String,
    website: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const ProjectModel =
  (models?.Project as Model<Project>) ||
  model<Project>('Project', ProjectSchema);

export default ProjectModel;
