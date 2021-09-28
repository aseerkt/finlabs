import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

enum LabelsEnum {
  'bug',
  'enhancement',
  'feature',
  'help wanted',
  'question',
}

const Labels = Object.values(LabelsEnum);

@modelOptions({ schemaOptions: { timestamps: true } })
export class Board {
  @prop({ required: true })
  title: string;

  @prop()
  description?: string;

  @prop({ type: 'string', enum: Labels })
  label: LabelsEnum;
}

const BoardModel = getModelForClass(Board);

export default BoardModel;
