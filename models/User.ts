import {
  prop,
  getModelForClass,
  pre,
  modelOptions,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@pre<User>('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
})
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, minlength: [6, 'password is too short'] })
  private password?: string;

  @prop({ required: true })
  public avatar!: string;

  verifyPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
const UserModel = getModelForClass(User);

export default UserModel;
