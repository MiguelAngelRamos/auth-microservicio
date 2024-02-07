import mongoose, { Schema, Document } from "mongoose";
import * as argon2 from 'argon2';

export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['ADMIN', 'USER']}
});

UserSchema.pre<IUser>('save', async function(next) {
  if(this.isModified('password')){
    this.password = await argon2.hash(this.password);
  }
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return argon2.verify(this.password, candidatePassword);
};

export default mongoose.model<IUser>('user', UserSchema);