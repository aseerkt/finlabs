import mongoose, { model, Schema } from 'mongoose';

export enum LabelsEnum {
  bug = 'bug',
  enhancement = 'enhancement',
  feature = 'feature',
  help_wanted = 'help wanted',
  question = 'question',
}

const Labels = Object.values(LabelsEnum);

export interface Board extends Document {
  title: string;
  description?: string;
  label: LabelsEnum;
}

const BoardSchema = new Schema<Board>({
  title: { type: String, required: true },
  description: String,
  label: { type: String, enum: Labels },
});

const BoardModel = mongoose.models.Board || model<Board>('Board', BoardSchema);

export default BoardModel;
