import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, default: null },
    role: {
      type: String,
      enum: ['assistent', 'hygienist', 'moder', 'admin'],
      default: 'assistent',
    },
    hourlyRate: { type: Number, default: 25 },
  },
  { versionKey: false }
);

userSchema.methods.hashPassword = async function () {
  this.password = await bcryptjs.hash(this.password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  const pass = await bcryptjs.compare(password, this.password);
  return pass;
};

export const User = model('user', userSchema);
