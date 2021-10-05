import mongoose, { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

interface IUser extends User {
  verifyPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
});

UserSchema.pre('save', async function () {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.verifyPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.models.User || model<IUser>('User', UserSchema);

export default UserModel;
