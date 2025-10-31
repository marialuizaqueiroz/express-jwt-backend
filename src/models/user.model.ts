import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string; 
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }
}, { timestamps: true });

export const UserModel = model<IUser>('User', userSchema);
