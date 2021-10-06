import mongoose, { Document, model, PopulatedDoc, Schema } from 'mongoose';
import { Board } from './Board';
import { User } from './User';

export interface Project extends Document {
  name: string;
  description?: string;
  sourceCode?: string;
  website?: string;
  boards: PopulatedDoc<Board>[];
  creator: PopulatedDoc<User>;
  createdAt: number;
  updatedAt: number;
}

const ProjectSchema = new Schema<Project>(
  {
    name: { type: String, required: true },
    description: String,
    sourceCode: String,
    website: String,
    boards: [{ type: 'ObjectId', ref: 'Board' }],
    creator: { type: 'ObjectId', ref: 'User' },
  },
  { timestamps: true }
);

const ProjectModel =
  mongoose.models?.Project || model<Project>('Project', ProjectSchema);

export default ProjectModel;
