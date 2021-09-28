import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { Board } from './Board';
import { User } from './User';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Project {
  @prop({ required: true })
  name: string;

  @prop()
  description?: string;

  @prop()
  sourceCode?: string;

  @prop()
  website?: string;

  @prop({ type: () => Board })
  boards: Ref<Board>[];

  @prop({ type: () => User })
  creator!: Ref<User>;
}

const ProjectModel = getModelForClass(Project);

export default ProjectModel;
